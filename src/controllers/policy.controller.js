const express = require("express");
const app = express();
const policyService = require("../services/policy.service");

app.get("/", policyService.aggregatePolicies);
app.get("/search", policyService.search);

module.exports = app;
