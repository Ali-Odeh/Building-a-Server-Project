"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./routes/images"));
const app = (0, express_1.default)();
// Basic middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/images", images_1.default);
// Health or root
app.get("/", (req, res) => {
    res.status(200).send("Image API is running. Use /api/images?filename=...&width=...&height=...");
});
// Error-handling: catch-all
app.use((err, _req, res) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});
exports.default = app;
