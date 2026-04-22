const { Queue } = require("bullmq");

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
};

const judgeQueue = new Queue("judge-queue", { connection });

module.exports = { judgeQueue };