const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.use("/api/v1/policy", require("./src/controllers/policy.controller"));
app.use("/api/v1", require("./src/controllers/upload.controller"));

// Custom logger
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.info(req.method, req.hostname, req.path, req.time);
  next();
});

// Server configuration
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.debug("=== DATABASE CONNECTED SUCCESSFULLY ====");
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
})();
