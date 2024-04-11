const express = require("express");
const app = express();
const upload = require("../shared/multer.config");
const uploadService = require("../services/upload.service");

app.post("/upload", upload.single("file"), uploadService.upload);

module.exports = app;
