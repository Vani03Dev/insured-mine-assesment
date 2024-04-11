const { Category } = require("../database/models/category.model");
const { Worker } = require("worker_threads");
const { Agent } = require("../database/models/agents.model");
const { Company } = require("../database/models/company.model");
const { Policy } = require("../database/models/policy.model");

//@function: fetch categories
const categories = async (req, res) => {
  try {
    return res.send({ data: await Category.find() });
  } catch (error) {
    console.error("Category fetch err ::", error);
    throw new Error(error);
  }
};

module.exports = { categories };
