const express = require("express");
const app = express();
const policyService = require("../services/policy.service");
const upload = require("../shared/multer.config");

app.get("/", policyService.categories);
app.post("/upload", upload.single("file"), policyService.upload);

module.exports = app;
