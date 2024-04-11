const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const uploadService = require("../services/upload.service");

app.post("/upload", upload.single("file"), uploadService.upload);

module.exports = app;
