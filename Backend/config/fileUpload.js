//fineName: fileUpload.js
const multer = require("multer");

// const upload = multer({ dest: 'images/' })

const fileStorage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  }); /*
  
const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
}; */
  
// Inicializa Multer
const upload = multer({ storage: fileStorage })

module.exports = upload;