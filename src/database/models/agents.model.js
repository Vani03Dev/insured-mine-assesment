const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Agent = mongoose.models.agents || mongoose.model("agents", AgentSchema);

Agent.createIndexes({ name: 1, _id: 1 }, { unique: true });
module.exports = { Agent };
