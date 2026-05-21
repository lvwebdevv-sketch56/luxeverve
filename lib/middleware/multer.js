import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the temporary upload directory exists
const uploadDir = path.resolve(process.cwd(), 'tmp');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to store files in the temporary directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Preserve original name with timestamp to avoid collisions
    const timestamp = Date.now();
    const sanitized = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}_${sanitized}`);
  },
});

export const upload = multer({ storage });
