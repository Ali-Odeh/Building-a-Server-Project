import request from "supertest";
import app from "../../src/server";
import path from "path";
import fs from "fs/promises";

const IMAGES_FOLDER = path.join(__dirname, "../../images");
const THUMBS_FOLDER = path.join(__dirname, "../../thumbs");

describe("GET /api/images", () => {
  const filename = "encenadaport.jpg"; // ensure this exists in images/
  const width = 200;
  const height = 200;
  const cachedName = `encenadaport_${width}x${height}.jpg`;
  const cachedPath = path.join(THUMBS_FOLDER, cachedName);

  beforeAll(async () => {
    // ensure thumbs folder exists and remove any leftover cached file
    await fs.mkdir(THUMBS_FOLDER, { recursive: true });
    try {
      await fs.unlink(cachedPath);
    } catch {
      // ignore
    }
  });

  it("returns 200 and JPEG when valid params", async () => {
    const res = await request(app)
      .get("/api/images")
      .query({ filename, width: String(width), height: String(height) })
      .expect(200);

    expect(res.headers["content-type"]).toMatch(/image\/jpeg/);
    // cached file should exist
    await expectAsync(fs.access(cachedPath)).toBeResolved();
  });

  it("returns 400 when missing filename", async () => {
    const res = await request(app)
      .get("/api/images")
      .query({ width: "10", height: "10" })
      .expect(400);
    expect(res.body.error).toBe("Missing filename parameter");
  });

  it("returns 400 for invalid width", async () => {
    const res = await request(app)
      .get("/api/images")
      .query({ filename, width: "-10", height: "10" })
      .expect(400);
    expect(res.body.error).toMatch(/Invalid width/);
  });

  it("returns 404 for non-existent image", async () => {
    const res = await request(app)
      .get("/api/images")
      .query({ filename: "no-such.jpg", width: "100", height: "100" })
      .expect(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});
