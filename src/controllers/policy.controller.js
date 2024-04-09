const express = require("express");
const app = express();
const policyService = require("../services/policy.service");

app.get("/", policyService.categories);

module.exports = app;
