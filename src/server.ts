import express from "express";
import imagesRouter from "./routes/images";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/images", imagesRouter);

// Health or root
app.get("/", (req, res) => {
  res.status(200).send("Image API is running. Use /api/images?filename=...&width=...&height=...");
});

// Error-handling: catch-all
app.use((err: unknown, _req: express.Request, res: express.Response) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
