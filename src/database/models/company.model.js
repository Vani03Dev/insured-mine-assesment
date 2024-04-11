const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Company =
  mongoose.models.companies || mongoose.model("companies", CompanySchema);

module.exports = { Company };
