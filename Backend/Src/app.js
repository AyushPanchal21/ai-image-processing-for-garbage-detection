import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import UserModel from '../Models/UserModel.js';
import DB from '../BDconnection.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import UploadRoute from '../UploadRoute.js'
import multer from 'multer';
import imageschema from '../Models/ImagesModel.js';

console.log("App file running");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use("/api", UploadRoute)

const storage = multer.memoryStorage();
export const upload = multer({ storage });


DB();
function middleware(req, res, next) {
    const token = req.cookies.Login_token
    if (!token) {
        return res.status(401).json({
            message: "unauthorized"
        })
    }
    var decoded = jwt.verify(token, 'ayush', (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded
        next();
    });
}

app.post("/Signup", async (req, res) => {
    const { Email, Password } = req.body

    if (Email === "" || Password === "") {
        return res.status(201).json({ message: "fill the details properly" })
    }
    const user = await UserModel.findOne({ Email })
    if (user) {
        return res.status(201).json({
            message: "user exists"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(Password, salt)
    const newUser = new UserModel({ Email, Password: hash })
    await newUser.save()

    return res.status(200).json({
        message: "user created",
        flag: true
    })
})

app.post("/Login", async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: "fill the details properly" });
    }

    const user = await UserModel.findOne({ Email });
    if (!user) {
        return res.status(401).json({ message: "user does not exist" });
    }

    bcrypt.compare(Password, user.Password, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "error while logging in"
            });
        }

        if (!result) {
            return res.status(401).json({
                message: "invalid password"
            });
        }

        const token = jwt.sign({ Email: user.Email }, "ayush", {
            expiresIn: "1d"
        });

        res.cookie("Login_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "logged in successfully",
            Email,
            flag: true,
            username: Email,
            _id: user._id
        });
    });
});

app.get("/me", (req, res) => {
    const token = req.cookies.Login_token;

    if (!token) {
        return res.status(401).json({ user: null });
    }

    jwt.verify(token, "ayush", (err, decoded) => {
        if (err) {
            return res.status(401).json({ user: null });
        }

        return res.status(200).json({
            user: decoded.Email
        });
    });
});

app.get("/check", async (req, res) => {
    try {
        const token = req.cookies.Login_token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        jwt.verify(token, "ayush", async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unauthorized" });

            const user = await UserModel.findOne({ Email: decoded.Email });

            const latestUpload = await imageschema
                .findOne({ userId: user._id })
                .sort({ _id: -1 });

            if (!latestUpload) {
                return res.status(404).json({ message: "No uploads found" });
            }


            res.json({
                beforeUrl: latestUpload.beforeImage,
                afterUrl: latestUpload.afterImage
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching upload" });
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("Login_token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    })
    res.status(200).json({ message: "Logged out successfully", logflag: true });
})

app.post("/updatepoints", async (req, res) => {
    const { userId, result } = req.body;

    try {
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const previousPoints = user.Points || 0;

        const earnedPoints = Number(result?.points) || 0;

        const newPoints = previousPoints + earnedPoints;

        user.Points = newPoints;
        await user.save();

        res.json({
            previousPoints,
            earnedPoints,
            updatedPoints: newPoints
        });

    } catch (err) {
        console.error("Update Points Error:", err);
        res.status(500).json({ message: "Error updating points" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`running on ${process.env.PORT}`)
})
