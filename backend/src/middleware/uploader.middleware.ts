import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { cwd } from "process";
import { AppError } from "../utils/AppError";

export const uploader = (
  directory: string,
  fileName: string,
  allowerdFiles: string[],
) => {
  const storage = multer.diskStorage({
    destination: function (_, __, cb) {
      const mainDir = path?.join(cwd());
      console.log(mainDir);

      cb(null, `${mainDir}/src/${directory}`);
    },

    filename: function (_, file, cb) {
      const fileExtention = file.originalname.split(".").slice(-1);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, fileName + "-" + uniqueSuffix + "." + fileExtention);
    },
  });

  function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) {
    const fileExtention = file.originalname.split(".").pop() as string;

    if (!fileExtention || !allowerdFiles.includes(fileExtention)) {
      return cb(
        new AppError(403, `File with <${fileExtention}> type is not allowed`),
      );
    }

    cb(null, true);
  }

  return multer({ storage, fileFilter });
};
