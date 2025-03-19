import fs from "fs"; // To handle file system operations like ensuring upload folder exists
import multer from "multer";

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Save file with a unique timestamp
  },
});

export const upload = multer({ storage });