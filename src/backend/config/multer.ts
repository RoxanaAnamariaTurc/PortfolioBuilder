import multer from "multer";
import path from "path";

const uploadDirectory = path.resolve("uploads");

export const upload = multer({
  dest: uploadDirectory,
});
