import { promises } from "fs";
import { resolve } from "path";

import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { TMP_FOLDER, UPLOADS_FOLDER } from "../tmp/uploads/upload.js";

export class DiskStorage {
  async saveFile(file) {
    await promises.rename(
      resolve(TMP_FOLDER, file),
      resolve(UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = resolve(UPLOADS_FOLDER, file);
    try {
      await promises.stat(filePath);
    } catch {
      return;
    }

    await promises.unlink(filePath);
  }
}
