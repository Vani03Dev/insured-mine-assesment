const category = require("../database/models/category.model");
const {Worker} = require("worker_threads");
const { Agent } = require("../database/models/agents.model");
const { Company } = require("../database/models/company.model");

const categories = async (req, res) => {
  try {
    return res.send({ data: await category.find() });
  } catch (error) {
    console.error("Category fetch err ::", error);
    throw new Error(error);
  }
};

const upload = async (req, res) => {
  if (!req.file) { return res.send({ status: false, message: 'File is required!' }) }
  
  try {
    const worker = new Worker(
      `${process.cwd()}/src/services/file.worker.service.js`,
      {
        workerData: { filePath: req.file.path },
      },
    );

    worker.on('message', async (data) => { 
     
      const toInsertAgents = [...new Set(data.data.map((res) => res.agent))].map(
      (value) => ({ name: value })
    );

      if(toInsertAgents)  await Agent.insertMany(toInsertAgents)

       const toInsertCompanies = [...new Set(data.data.map((res) => res.company_name))].map(
      (value) => ({ name: value })
      );

      if(toInsertCompanies.length) await Company.insertMany(toInsertCompanies)
    });
    worker.on('error', (err) => err);
    worker.on("end",(end) => end)
  } catch (error) {
    console.error("Upload fn error ::", error)
    
    throw error
  }


  return res.send({status: true})

}

module.exports = { categories,upload };
