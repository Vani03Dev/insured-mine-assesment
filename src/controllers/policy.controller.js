const express = require("express");
const app = express();
const policyService = require("../services/policy.service");
const upload = require("../shared/multer.config");

app.get("/", policyService.categories);

module.exports = app;
