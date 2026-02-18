const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary, isConfigured } = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

if (isConfigured) {
  console.log("✅ Using Cloudinary for document uploads.");
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "business_documents",
      allowed_formats: ["jpg", "png", "pdf"],
      public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
  });
} else {
  console.log("⚠️ Cloudinary not configured. Falling back to local disk storage for testing.");

  // Ensure uploads directory exists
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
}

const upload = multer({ storage: storage });

module.exports = upload;
