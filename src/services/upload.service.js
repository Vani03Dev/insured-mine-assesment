const { Worker } = require("worker_threads");
const { schemas } = require("../database/models/index");
const moment = require("moment");
const { Category } = require("../database/models/category.model");
const { User } = require("../database/models/user.model");
const { Company } = require("../database/models/company.model");
const { Agent } = require("../database/models/agents.model");
const { Policy } = require("../database/models/policy.model");

/**
 *
 * @param {string} filePath The absolute path to the file to be processed.
 * @function: Process worker
 */
const fileProcess = async (filePath) => {
  try {
    const worker = new Worker(
      `${process.cwd()}/src/services/file.worker.service.js`,
      {
        workerData: { filePath },
      }
    );
    worker.on("message", ({ status, data }) =>
      handleOnMessage(data.slice(1, data.length))
    );
    worker.on("error", (err) => err);
    worker.on("end", (end) => end);
  } catch (error) {
    console.error("Upload fn error ::", error);

    throw error;
  }
};

/**
 * Handles the file upload request.
 *
 * @param {Object} req The HTTP request object, containing the file data.
 * @param {Object} res The HTTP response object, used to send back a response.
 */
const upload = async (req, res) => {
  if (!req.file) {
    return res.send({ status: false, message: "File is required!" });
  }
  await fileProcess(req.file.path);
  return res.send({ status: true });
};

const handleOnMessage = async (data) => {
  try {
    // upsert users
    await Promise.all([
      upsertCategories(data),
      upsertCompanies(data),
      upsertUsers(data),
      upsertAgents(data),
      upsertUsersPolicy(data),
    ]);
  } catch (error) {
    console.error("OnHandle error ::", error);
    throw new Error(error);
  }
};

/**
 *
 * @param {*} data -
 * @function: Upsert/insert agent data
 */
const upsertAgents = async (data) => {
  const agents = [...new Set(data.map((res) => res.agent))].map(
    (agentName) => ({
      updateOne: {
        filter: { name: agentName },
        update: { $setOnInsert: { name: agentName } },
        upsert: true,
      },
    })
  );

  if (agents) {
    await Agent.bulkWrite(agents);
    console.log("==== AGENT UPSERT/INSERT SUCCESSFULLY ::", agents.length);
  }
};

/**
 *
 * @param {*} data -[]
 * @function: Upsert/insert companies
 */
const upsertCompanies = async (data) => {
  // find categories
  const categories = await findCategories();

  const uniquePairs = Array.from(
    new Set(data.map((res) => `${res.company_name}|${res.category_name}`))
  );

  const upsertCompanies = uniquePairs.map((pair) => {
    const [companyName, categoryName] = pair.split("|");
    const category = categories.find((cat) => cat.name === categoryName);
    return {
      updateOne: {
        filter: {
          name: companyName,
          categoryId: category ? category._id.toString() : null,
        },
        update: {
          $setOnInsert: {
            name: companyName,
            categoryId: category ? category._id.toString() : null,
          },
        },
        upsert: true,
      },
    };
  });

  if (upsertCompanies.length) {
    await Company.bulkWrite(upsertCompanies);
    console.log(
      "==== COMPANY UPSERT/INSERT SUCCESSFULLY ::",
      upsertCompanies.length
    );
  }
};

/**
 *
 * @param {*} data -[]
 * @function: Upsert/insert categories
 */
const upsertCategories = async (data) => {
  const categories = [...new Set(data.map((res) => res.category_name))].map(
    (category) => ({
      updateOne: {
        filter: { name: category },
        update: { $setOnInsert: { name: category } },
        upsert: true,
      },
    })
  );

  if (categories) {
    await Category.bulkWrite(categories);
    console.log(
      "==== CATEGORIES UPSERT/INSERT SUCCESSFULLY ::",
      categories.length
    );
  }
};

/**
 *
 * @param {*} data -[]
 * @function: Upsert/insert user's array
 */
const upsertUsers = async (data) => {
  const users = [
    ...new Set(
      data.map(
        ({
          firstname,
          address,
          phone,
          state,
          zip,
          email,
          userType,
          dob,
          account_name,
        }) => ({
          firstName: firstname?.split(" ")[0],
          lastName: firstname?.split(" ")[1],
          userName: firstname,
          dob: moment(dob).format("YYYY-MM-DD"),
          phoneNumber: phone,
          gender: "",
          address,
          state,
          zipCode: zip,
          email,
          userType,
          accountName: account_name,
        })
      )
    ),
  ].map((user) => ({
    updateOne: {
      filter: { email: user.email },
      update: { $setOnInsert: user },
      upsert: true,
    },
  }));

  if (users) {
    await User.bulkWrite(users);
    console.log("==== USERS UPSERT/INSERT SUCCESSFULLY ::", users.length);
  }
};

const upsertUsersPolicy = async (data) => {
  try {
    const [companies, agents, users] = await Promise.all([
      findCompanies(),
      findAgents(),
      findUsers(),
    ]);

    const policyData = data.map((res) => {
      const company = companies.find((v) => v.name === res.company_name);
      const agent = agents.find((v) => v.name === res.agent);
      const user = users.find((v) => v.email === res.email);

      return {
        updateOne: {
          filter: { policyNumber: res.policy_number },
          update: {
            $set: {
              policyNumber: res.policy_number,
              startDate: res.policy_start_date,
              endDate: res.policy_end_date,
              premiumAmount: res.premium_amount,
              type: res.policy_type,
              policyMode: +res.policy_mode,
              userId: user ? user.id : null,
              companyId: company ? company._id.toString() : null,
              categoryId: company ? company.categoryId.toString() : null,
              agentId: agent ? agent._id.toString() : null,
              status: true,
            },
          },
          upsert: true,
        },
      };
    });

    if (policyData) {
      await Policy.bulkWrite(policyData);
      console.log(
        "======= POLICY UPSERT/INSERT SUCCESSFULLY ==== :",
        policyData.length
      );
    }
  } catch (error) {
    console.error("==== Upsert user policy error ::", error);
  }
};

/**
 * Fetches companies
 *
 * @returns {Promise<Array>} Returns companies[]
 */
const findCompanies = async () => {
  return await Company.find().select(["_id", "name", "categoryId"]);
};

/**
 * Fetches categories
 *
 * @returns {Promise<Array>} Returns category[].
 */
const findCategories = async () => {
  return await Category.find().select(["_id", "name"]);
};

/**
 * Fetch agents
 *
 * @returns {Promise<Array>} Returns agents[]
 */
const findAgents = async () => {
  return await Agent.find().select(["_id", "name"]);
};

/**
 * Fetchs  users
 *
 * @returns {Promise<Array>} Returns users[]
 */
const findUsers = async () => {
  return await User.find().select(["_id", "name", "email"]);
};

module.exports = { fileProcess, upload };
