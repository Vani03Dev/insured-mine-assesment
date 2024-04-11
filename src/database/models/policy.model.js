const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  premiumAmount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  policyMode: { type: Number, required: true },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Agent",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Policy =
  mongoose.models.policies || mongoose.model("policies", PolicySchema);

module.exports = { Policy };
