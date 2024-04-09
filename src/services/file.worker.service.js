const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const csvParser = require("csv-parser");
const agents = require("../database/models/agents.model.js");
const { sortBy } = require("lodash");
const { Agent } = require("../database/models/agents.model.js");
const monggose = require("mongoose");
// const conn = await mongoose.connect(process.env.MONGO_URI);

const readFile = async (filePath) => {
  const rows = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ headers: true }))
      .on("data", (row) => rows.push(transformData(row)))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
};

readFile(workerData.filePath)
  .then(async (v) => {
    parentPort?.postMessage({ success: true, data: v });
  })
  .catch((err) => console.error(err));

function transformData(data) {
  return {
    agent: data._0 || "",
    userType: data._1 || "",
    policy_mode: data._2 || "",
    producer: data._3 || "",
    policy_number: data._4 || "",
    premium_amount_written: data._5 || "",
    premium_amount: data._6 || "",
    policy_type: data._7 || "",
    company_name: data._8 || "",
    category_name: data._9 || "",
    policy_start_date: data._10 || "",
    policy_end_date: data._11 || "",
    csr: data._12 || "",
    account_name: data._13 || "",
    email: data._14 || "",
    gender: data._15 || "",
    firstname: data._16 || "",
    city: data._17 || "",
    account_type: data._18 || "",
    phone: data._19 || "",
    address: data._20 || "",
    state: data._21 || "",
    zip: data._22 || "",
    dob: data._23 || "",
  };
}
