import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { diskStorage } from "multer";
import { randomBytes } from "crypto";

export const TMP_FOLDER = path.dirname(__dirname, "./.", "tmp");

export const UPLOADS_FOLDER = path.dirname(`${TMP_FOLDER}/` + "uploads/.");

export const MULTER = {
  storage: diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
