const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected success"))
  .catch((err) => console.error("Database connection failed! ::", err));
