const category = require("../database/models/category.model");

const categories = async (req, res) => {
  try {
    console.log("== INITIATED CATEGORIES FUNCTION ....");

    const result = await category.find();

    console.log("Result ::", result);
    return result;
  } catch (error) {
    console.error("Category fetch err ::", error);
  }
};

module.exports = { categories };
