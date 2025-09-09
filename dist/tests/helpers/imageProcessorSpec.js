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
const imageProcessor_1 = require("../../dist/utilities/imageProcessor");
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
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield promises_1.default.mkdir(THUMBS_FOLDER, { recursive: true });
        try {
            yield promises_1.default.unlink(expectedPath);
        }
        catch (_a) {
            // ignore
        }
    }));
    it("creates a resized image and returns path", () => __awaiter(void 0, void 0, void 0, function* () {
        const out = yield (0, imageProcessor_1.resizeImage)({
            filename,
            width,
            height,
            inputFolder: IMAGES_FOLDER,
            outputFolder: THUMBS_FOLDER,
        });
        expect(out).toBe(expectedPath);
        yield expectAsync(promises_1.default.access(expectedPath)).toBeResolved();
    }));
    it("throws for invalid width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, imageProcessor_1.resizeImage)({
            filename,
            width: -10,
            height,
            inputFolder: IMAGES_FOLDER,
            outputFolder: THUMBS_FOLDER,
        })).toBeRejectedWithError();
    }));
    it("throws for missing source", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, imageProcessor_1.resizeImage)({
            filename: "no-such.jpg",
            width,
            height,
            inputFolder: IMAGES_FOLDER,
            outputFolder: THUMBS_FOLDER,
        })).toBeRejectedWithError(/Source image not found/);
    }));
});
