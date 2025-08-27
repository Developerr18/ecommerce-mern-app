const express = require("express");
const multer = require("multer"); // handle file uploads in express
const path = require("path");

const app = express();

// Serve static files
app.use(express.static("public"));

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads"); // folder where files will be saved
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname); // unique filename
  },
});

const upload = multer({ storage });

// Create Route to upload file
app.post("/profile", upload.single("avatar"), (req, res) => {
  res.send({
    message: "File uploaded successfully!",
    file: req.file,
  });
});

app.listen(5000, () => console.log("server running"));
