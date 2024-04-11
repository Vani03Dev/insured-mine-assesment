const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}${ext}`;

    console.log("fileName ::", filename);
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => checkFileType(file, callback),
});

//@function: Check file type
function checkFileType(file, cb) {
  const filetypes = /csv|xlsx|xls/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(" Only CSV and Excel files are allowed!");
  }
}

module.exports = upload;
