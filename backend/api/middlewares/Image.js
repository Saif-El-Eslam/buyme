import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.array("file");
export const uploadToCloudinary = async (req, res, next) => {
  try {
    myUploadMiddleware(req, res, async () => {
      const urls = [];
      const files = req.files;
      if (!files) {
        return res.status(400).json({ message: "No files were uploaded" });
      }

      for (const file of files) {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        const response = await cloudinary.uploader.upload(dataURI, {
          folder: "shopping-website-images",
        });

        urls.push(response.secure_url);
      }

      req.body.images = urls;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCloudinary = async (req, res, next) => {
  try {
    const { images } = req.body;

    if (!images || images.length === 0) {
      req.body.deleteResponse = { result: "image empty" };
      return next();
    }

    images.forEach(async (image) => {
      const urlParts = image.split("/");
      const folderName = urlParts[urlParts.length - 2];
      const publicId = urlParts[urlParts.length - 1].split(".")[0];

      const response = await cloudinary.uploader.destroy(
        `${folderName}/${publicId}`
      );
    });

    next();
  } catch (error) {
    console.log(error);
  }
};
