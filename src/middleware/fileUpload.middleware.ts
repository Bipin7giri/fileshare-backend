import multer from "multer";
import fs from "fs";

// Define storage destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Get current timestamp
    const filename = `${timestamp}-${file.originalname}`; // Append timestamp to filename
    cb(null, filename); // Use the modified filename for storing
  },
});

// Create multer instance with disk storage
export const upload = multer({ storage: storage });
