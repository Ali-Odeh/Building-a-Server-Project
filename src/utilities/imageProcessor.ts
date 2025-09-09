import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

export type ResizeParams = {
  filename: string;
  width: number;
  height: number;
  inputFolder: string;
  outputFolder: string;
};

/**
 * Resize image using sharp. If cached result exists, returns it.
 * Returns the absolute path to the resulting image (cached or newly created).
 */
export async function resizeImage(params: ResizeParams): Promise<string> {
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

  const sourcePath = path.join(inputFolder, filename);

  // Verify source exists
  try {
    await fs.access(sourcePath);
  } catch {
    throw new Error(`Source image not found: ${sourcePath}`);
  }

  // Normalize name and produce cached filename
  const nameWithoutExt = path.parse(filename).name;
  const cachedFilename = `${nameWithoutExt}_${width}x${height}.jpg`;
  const cachedPath = path.join(outputFolder, cachedFilename);

  // If cached exists, return it
  try {
    await fs.access(cachedPath);
    return cachedPath;
  } catch {
    // doesn't exist -> create
  }

  // Perform resizing
  await sharp(sourcePath).resize(width, height).jpeg({ quality: 80 }).toFile(cachedPath);

  // Confirm created
  await fs.access(cachedPath);

  return cachedPath;
}
