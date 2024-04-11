const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Agent = mongoose.models.agents || mongoose.model("agents", AgentSchema);

module.exports = { Agent };
