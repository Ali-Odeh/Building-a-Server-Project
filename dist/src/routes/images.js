"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const imageProcessor_1 = require("../utilities/imageProcessor");
const router = (0, express_1.Router)();
const IMAGES_FOLDER = path_1.default.join(__dirname, "../../images");
const THUMBS_FOLDER = path_1.default.join(__dirname, "../../thumbs");
router.get("/", async (req, res) => {
    try {
        const filename = req.query.filename || "";
        const widthRaw = req.query.width;
        const heightRaw = req.query.height;
        // Validate presence
        if (!filename) {
            return res.status(400).json({ error: "Missing filename parameter" });
        }
        if (!widthRaw || !heightRaw) {
            return res.status(400).json({ error: "Missing width or height parameter" });
        }
        // Validate numeric
        const width = Number(widthRaw);
        const height = Number(heightRaw);
        if (!Number.isFinite(width) || width <= 0 || !Number.isInteger(width)) {
            return res.status(400).json({ error: "Invalid width. Must be a positive integer" });
        }
        if (!Number.isFinite(height) || height <= 0 || !Number.isInteger(height)) {
            return res.status(400).json({ error: "Invalid height. Must be a positive integer" });
        }
        // Confirm source image exists
        const sourcePath = path_1.default.join(IMAGES_FOLDER, filename);
        try {
            await promises_1.default.access(sourcePath);
        }
        catch {
            return res.status(404).json({ error: `Image "${filename}" not found` });
        }
        // Ensure thumbs folder exists
        try {
            await promises_1.default.mkdir(THUMBS_FOLDER, { recursive: true });
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.error("Could not create thumbs folder", err);
        }
        // Process / fetch cached
        const outputPath = await (0, imageProcessor_1.resizeImage)({
            filename,
            width,
            height,
            inputFolder: IMAGES_FOLDER,
            outputFolder: THUMBS_FOLDER,
        });
        // send the file
        return res.sendFile(outputPath);
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error in /api/images:", err);
        return res.status(500).json({ error: "Could not process the image" });
    }
});
exports.default = router;
