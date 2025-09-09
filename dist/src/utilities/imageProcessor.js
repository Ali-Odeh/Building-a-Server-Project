"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = resizeImage;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const sharp_1 = __importDefault(require("sharp"));
/**
 * Resize image using sharp. If cached result exists, returns it.
 * Returns the absolute path to the resulting image (cached or newly created).
 */
async function resizeImage(params) {
    const { filename, width, height, inputFolder, outputFolder } = params;
    if (!filename) {
        throw new Error("filename required");
    }
    if (!Number.isInteger(width) || width <= 0) {
        throw new Error("width must be a positive integer");
    }
    if (!Number.isInteger(height) || height <= 0) {
        throw new Error("height must be a positive integer");
    }
    const sourcePath = path_1.default.join(inputFolder, filename);
    // Verify source exists
    try {
        await promises_1.default.access(sourcePath);
    }
    catch {
        throw new Error(`Source image not found: ${sourcePath}`);
    }
    // Normalize name and produce cached filename
    const nameWithoutExt = path_1.default.parse(filename).name;
    const cachedFilename = `${nameWithoutExt}_${width}x${height}.jpg`;
    const cachedPath = path_1.default.join(outputFolder, cachedFilename);
    // If cached exists, return it
    try {
        await promises_1.default.access(cachedPath);
        return cachedPath;
    }
    catch {
        // doesn't exist -> create
    }
    // Perform resizing
    await (0, sharp_1.default)(sourcePath).resize(width, height).jpeg({ quality: 80 }).toFile(cachedPath);
    // Confirm created
    await promises_1.default.access(cachedPath);
    return cachedPath;
}
