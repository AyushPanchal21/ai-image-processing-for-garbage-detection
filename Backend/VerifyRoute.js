import express from "express";
import multer from "multer";
import axios from "axios";
import formdata from 'form-data'

const router = express.Router()

const upload = multer({storage:multer.memoryStorage()})
router.post("/verify",async(req,res)=>{
    try{
        const beforeFile = req.file["before"][0]
        const afterFile = req.file["after"][0]

        const form = new formdata();
        form.append("before" , beforeFile.buffer , beforeFile.originalname)
        form.append("after" , afterFile.buffer , afterFile.originalname)

        const pythonresponse = await axios.post("http://127.0.0.1:8000/verify",form,{
            headers:form.getHeaders(),
        })

        res.json({
            success:true,
            result:pythonresponse.data,
        });
    }catch(err){
        console.log(err);
    }
})

export default router;
