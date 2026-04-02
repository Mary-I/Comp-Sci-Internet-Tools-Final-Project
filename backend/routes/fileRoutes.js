const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const File = require("../models/File");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const safeName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
        cb(null, safeName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [".pdf", ".mp4"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only .pdf and .mp4 files are allowed."));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter
});

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const newFile = new File({
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`,
            size: req.file.size,
            uploadedBy: req.user.id
        });

        await newFile.save();

        res.status(201).json({ message: "File uploaded successfully." });
    } catch (error) {
        res.status(500).json({ message: "Upload failed." });
    }
});

router.get("/public-files", authMiddleware, async (req, res) => {
    try {
        const files = await File.find().populate("uploadedBy", "username email");
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch files." });
    }
});

router.get("/my-files", authMiddleware, async (req, res) => {
    try {
        const files = await File.find({ uploadedBy: req.user.id }).populate("uploadedBy", "username email");
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch your files." });
    }
});

router.delete("/files/:id", authMiddleware, async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found." });
        }

        if (file.uploadedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden. You can only delete your own files." });
        }

        const filePath = path.join(__dirname, "..", "uploads", path.basename(file.path));

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await File.findByIdAndDelete(req.params.id);

        res.json({ message: "File deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Could not delete file." });
    }
});

module.exports = router;