const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/profile", upload.single("avatar"), (req, res) => {
  res.send({
    message: "File uploaded successfully!",
    file: req.file,
  });
});

app.listen(5000, () => console.log("server running"));
