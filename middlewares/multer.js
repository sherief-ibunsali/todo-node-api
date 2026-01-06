const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
