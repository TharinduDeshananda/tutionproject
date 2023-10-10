import fs from "fs";
import path from "path";
export async function uploadBlobToLocalStorage(
  blob: Blob,
  fileName: string,
  type: string
) {
  try {
    const url = path.join("public", "uploads", `${fileName}`);
    const buffer = await blob.arrayBuffer();

    await fs.promises.writeFile(url, Buffer.from(buffer));
    return url;
  } catch (e) {
    console.error("method uploadBlobToLocalStorage failed: ", e);
    throw e;
  }
}
