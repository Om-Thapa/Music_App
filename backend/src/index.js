import express from "express";
import { config } from "dotenv"
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from 'path';
import cors from "cors"

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials: true,
    })
)
app.use(clerkMiddleware()); // Adds auth to req obj( req.auth )
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, 'tmp'),
        createParentPath: true,
        limits: {
            fileSize: 10 * 1024 * 1024, // 10MB max file size
        }
    })
)

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes)
app.get("hi", (req, res) => {
    res.status(200).json({message : "Hello"});
});

app.listen(PORT, ()=>{
    console.log(`Server Listening to PORT : ${PORT}`);
    connectDB();
})