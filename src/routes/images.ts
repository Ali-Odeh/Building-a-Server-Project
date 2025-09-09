import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs/promises";
import { resizeImage } from "../utilities/imageProcessor";

const router = Router();

const IMAGES_FOLDER = path.join(process.cwd(), "images");
const THUMBS_FOLDER = path.join(process.cwd(), "thumbs");

router.get("/", async (req: Request, res: Response) => {
  try {
    const filename = (req.query.filename as string) || "";
    const widthRaw = req.query.width as string | undefined;
    const heightRaw = req.query.height as string | undefined;

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
    const sourcePath = path.join(IMAGES_FOLDER, filename);
    console.log("Looking for image at:", sourcePath);
    console.log("IMAGES_FOLDER:", IMAGES_FOLDER);
    try {
      await fs.access(sourcePath);
    } catch {
      return res.status(404).json({ error: `Image "${filename}" not found at ${sourcePath}` });
    }

    // Ensure thumbs folder exists
    try {
      await fs.mkdir(THUMBS_FOLDER, { recursive: true });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Could not create thumbs folder", err);
    }

    // Process / fetch cached
    const outputPath = await resizeImage({
      filename,
      width,
      height,
      inputFolder: IMAGES_FOLDER,
      outputFolder: THUMBS_FOLDER,
    });

    // send the file
    return res.sendFile(outputPath);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error in /api/images:", err);
    return res.status(500).json({ error: "Could not process the image" });
  }
});

export default router;
