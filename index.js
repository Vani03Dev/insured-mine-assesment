const express = require("express");

const app = express();

app.use(express.json());
require("dotenv").config();
require("./src/database/database.config");

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.use("/categories", require("./src/controllers/policy.controller"));

// Custom logger
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.info(req.method, req.hostname, req.path, req.time);
  next();
});

// Server configuration
app.listen(process.env.PORT || 3001, () =>
  console.debug(`===== Server started listening on port :${process.env.PORT}`)
);
