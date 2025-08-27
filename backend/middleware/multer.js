import multer from "multer";

// storage configure
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// upload middleware
const upload = multer({ storage });

export default upload;
