const express = require("express");
const { monitorCPU } = require("./server-cpu-monitoring");

const app = express();

require("dotenv").config();
app.use(express());

app.get("/", (req, res) => res.json({ message: "Test route" }));

//Server configuration
app.listen(process.env.PORT || 3001, () =>
  console.log(`Server started listening on port :: ${process.env.PORT}`)
);

monitorCPU();
