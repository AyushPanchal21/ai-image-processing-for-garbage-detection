import express from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import imageschema from './Models/ImagesModel.js'
import axios from "axios";

const router = express.Router();
console.log("UploadRoute.js loaded");

// Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE // make sure .env has correct spelling
);

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowed.includes(file.mimetype)) return cb(new Error("Only jpeg, png, jpg are allowed!"));
        cb(null, true);
    },
});


// Upload image
router.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
        const { UserId, type } = req.body;
        const file = req.file;
        if (!UserId || !type || !file) return res.status(400).json({ message: "Missing Data!" });

        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        const filepath = `${UserId}/${type}/${filename}`;

        const { error } = await supabase.storage
            .from("images")
            .upload(filepath, file.buffer, { contentType: file.mimetype });
        if (error) throw error;

        const { data } = supabase.storage.from("images").getPublicUrl(filepath);

        res.json({ success: true, url: data.publicUrl, path: filepath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post("/save-upload",async(req,res)=>{
    try{
        const {userId,beforeUrl,afterUrl} = req.body

        const uploadurl = new imageschema({
             userId,
            beforeImage: beforeUrl,
            afterImage: afterUrl
        })

        await uploadurl.save()
        res.json({
            message:"success"
        })
    }catch(err){
        console.log(err);
    }
})

router.get("/uploads/:userId", async (req, res) => {
    const uploads = await imageschema.find({ userId: req.params.userId });
    res.json(uploads);
});

router.post("/verify",async(req,res)=>{
    try{
        // console.log(req.body);
        const {beforeUrl,afterUrl} = req.body;
        
        // console.log(beforeimage,afterimage);
        
        if (!beforeUrl || !afterUrl) {
            return res.status(400).json({ message: "imageUrl missing" });
        }

        const pythonRes = await axios.post("http://127.0.0.1:8000/verify", {
            beforeUrl,
            afterUrl
        });

        res.json(pythonRes.data);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Python service error" });
    }
})

export default router;
