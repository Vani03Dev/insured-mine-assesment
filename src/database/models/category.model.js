const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});
global.categorySchema =
  global.categorySchema || mongoose.model("categories", categorySchema);
module.exports = global.categorySchema;
