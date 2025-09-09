import { resizeImage } from "../../src/utilities/imageProcessor";
import path from "path";
import fs from "fs/promises";

const IMAGES_FOLDER = path.join(__dirname, "../../images");
const THUMBS_FOLDER = path.join(__dirname, "../../thumbs");

describe("imageProcessor.resizeImage", () => {
  const filename = "encenadaport.jpg";
  const width = 150;
  const height = 120;
  const expectedName = `encenadaport_${width}x${height}.jpg`;
  const expectedPath = path.join(THUMBS_FOLDER, expectedName);

  beforeAll(async () => {
    await fs.mkdir(THUMBS_FOLDER, { recursive: true });
    try {
      await fs.unlink(expectedPath);
    } catch {
      // ignore
    }
  });

  it("creates a resized image and returns path", async () => {
    const out = await resizeImage({
      filename,
      width,
      height,
      inputFolder: IMAGES_FOLDER,
      outputFolder: THUMBS_FOLDER,
    });
    expect(out).toBe(expectedPath);
    await expectAsync(fs.access(expectedPath)).toBeResolved();
  });

  it("throws for invalid width", async () => {
    await expectAsync(
      resizeImage({
        filename,
        width: -10,
        height,
        inputFolder: IMAGES_FOLDER,
        outputFolder: THUMBS_FOLDER,
      })
    ).toBeRejectedWithError();
  });

  it("throws for missing source", async () => {
    await expectAsync(
      resizeImage({
        filename: "no-such.jpg",
        width,
        height,
        inputFolder: IMAGES_FOLDER,
        outputFolder: THUMBS_FOLDER,
      })
    ).toBeRejectedWithError(/Source image not found/);
  });
});
