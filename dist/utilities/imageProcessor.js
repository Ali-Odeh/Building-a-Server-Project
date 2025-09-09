"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function resizeImage(params) {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield promises_1.default.access(sourcePath);
        }
        catch (_a) {
            throw new Error(`Source image not found: ${sourcePath}`);
        }
        // Normalize name and produce cached filename
        const nameWithoutExt = path_1.default.parse(filename).name;
        const cachedFilename = `${nameWithoutExt}_${width}x${height}.jpg`;
        const cachedPath = path_1.default.join(outputFolder, cachedFilename);
        // If cached exists, return it
        try {
            yield promises_1.default.access(cachedPath);
            return cachedPath;
        }
        catch (_b) {
            // doesn't exist -> create
        }
        // Perform resizing
        yield (0, sharp_1.default)(sourcePath).resize(width, height).jpeg({ quality: 80 }).toFile(cachedPath);
        // Confirm created
        yield promises_1.default.access(cachedPath);
        return cachedPath;
    });
}
