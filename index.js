const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
require("dotenv").config();

// require("./src/database/models");
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.use("/categories", require("./src/controllers/policy.controller"));

// Custom logger
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.info(req.method, req.hostname, req.path, req.time);
  next();
});

// Server configuration

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
