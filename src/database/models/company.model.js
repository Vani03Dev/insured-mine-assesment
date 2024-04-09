const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Company =
  mongoose.models.companies || mongoose.model("companies", CompanySchema);

Company.createIndexes({ name: 1 }, { unique: true });

module.exports = { Company };
