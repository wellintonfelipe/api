import path from "path";
import { diskStorage } from "multer";
import { randomBytes } from "crypto";

export const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

export const UPLOADS_FOLDER = path.resolve(__dirname, "uploads");

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
