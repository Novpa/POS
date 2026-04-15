import { v2 as cloudinary, UploadStream } from "cloudinary";
import { CLOUDINARY } from "../config/dotenv.config";

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
});

interface CloudinaryUploadReturn {
  secureUrl: string;
}

export const cloudinaryUpload = async (
  file: Buffer,
): Promise<CloudinaryUploadReturn> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "pos",
        },
        (error, result?) => {
          if (error || !result) {
            return reject(error);
          }
          resolve({ secureUrl: result?.secure_url });
        },
      )
      .end(file);
  });
};
