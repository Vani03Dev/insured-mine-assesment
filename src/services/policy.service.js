const { Category } = require("../database/models/category.model");
const { Worker } = require("worker_threads");
const { Agent } = require("../database/models/agents.model");
const { Company } = require("../database/models/company.model");
const { Policy } = require("../database/models/policy.model");
const { isEmpty } = require("lodash");
const { User } = require("../database/models/user.model");

//@function: fetch categories
const categories = async (req, res) => {
  try {
    return res.send({ data: await Category.find() });
  } catch (error) {
    console.error("Category fetch err ::", error);
    throw new Error(error);
  }
};

const search = async (req, res) => {
  try {
    const username = req.query.username.trim();

    if (username === "") {
      return res.send({
        success: false,
        message: "Invalid username or empty!",
      });
    }

    const results = await policyByUserName(username);

    if (!results) {
      return res.send({
        status: false,
        message: "No result found!",
        data: null,
      });
    }
    return res.send({
      status: false,
      message: "Found user policy",
      data: results,
    });
  } catch (error) {
    console.error("Search error ::", error);
  }
};

/**
 * @param: {req,res,query}
 * @function: Pull policy by username
 * @returns: Returns policy with each respective user
 */
const policyByUserName = async (username) => {
  return await User.aggregate([
    { $match: { userName: username } },
    {
      $lookup: {
        from: "policies",
        localField: "_id",
        foreignField: "userId",
        as: "policies",
      },
    },
  ]);
};

/**
 * @param: {req,res}
 * @function: Pull aggregate policies with respect to users
 * @returns: Returns policies with each users
 */
const aggregatePolicies = async (req, res) => {
  try {
    const policies = await User.aggregate([
      {
        $lookup: {
          from: "policies",
          localField: "_id",
          foreignField: "userId",
          as: "policies",
        },
      },
    ]);

    if (isEmpty(policies)) {
      return res.send({
        status: true,
        message: "No Policy found!",
        data: null,
      });
    }
    return res.send({
      status: true,
      message: "Policies fetched success.",
      data: policies,
    });
  } catch (error) {
    console.error("==== Policies pull error ::", error);
  }
};
module.exports = { categories, search, aggregatePolicies };
