const os = require("os");
const { exec } = require("child_process");
const CPU_THRESHOLD_PERCENTAGE = 70;

//@function: To Monitor CPU
const monitorCPU = () => {
  const cpuUsage = os.loadavg()[0];

  console.log(`Current CPU Usage: ${cpuUsage.toFixed(2)}%`);

  if (cpuUsage >= CPU_THRESHOLD_PERCENTAGE) {
    console.log("CPU Usage is too high. Restarting server...");
    restartServer();
  }

  performCPUIntensiveTask();
};

//@function: To Restart server
const restartServer = () => {
  exec("pm2 restart sample-app", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error restarting server: ${error}`);
      return;
    }
    console.log(`Server restarted: ${stdout}`);
  });
};

const performCPUIntensiveTask = () => {
  console.log("executed cpu intensibe task fnnn..");
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random() * Math.random();
  }
  console.log("CPU-intensive task executed.");
};

module.exports = { monitorCPU };
