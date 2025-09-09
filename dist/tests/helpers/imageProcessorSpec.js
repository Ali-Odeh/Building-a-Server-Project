"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageProcessor_1 = require("../../src/utilities/imageProcessor");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const IMAGES_FOLDER = path_1.default.join(__dirname, "../../images");
const THUMBS_FOLDER = path_1.default.join(__dirname, "../../thumbs");
describe("imageProcessor.resizeImage", () => {
    const filename = "encenadaport.jpg";
    const width = 150;
    const height = 120;
    const expectedName = `encenadaport_${width}x${height}.jpg`;
    const expectedPath = path_1.default.join(THUMBS_FOLDER, expectedName);
    beforeAll(async () => {
        await promises_1.default.mkdir(THUMBS_FOLDER, { recursive: true });
        try {
            await promises_1.default.unlink(expectedPath);
        }
        catch {
            // ignore
        }
    });
    it("creates a resized image and returns path", async () => {
        const out = await (0, imageProcessor_1.resizeImage)({
            filename,
            width,
            height,
            inputFolder: IMAGES_FOLDER,
            outputFolder: THUMBS_FOLDER,
        });
        expect(out).toBe(expectedPath);
        await expectAsync(promises_1.default.access(expectedPath)).toBeResolved();
    });
    it("throws for invalid width", async () => {
        await expectAsync((0, imageProcessor_1.resizeImage)({
            filename,
            width: -10,
            height,
            inputFolder: IMAGES_FOLDER,
            outputFolder: THUMBS_FOLDER,
        })).toBeRejectedWithError();
    });
    it("throws for missing source", async () => {
        await expectAsync((0, imageProcessor_1.resizeImage)({
            filename: "no-such.jpg",
            width,
            height,
            inputFolder: IMAGES_FOLDER,
            outputFolder: THUMBS_FOLDER,
        })).toBeRejectedWithError(/Source image not found/);
    });
});
