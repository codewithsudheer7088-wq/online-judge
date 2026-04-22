const Queue = require("bull");

const queue = new Queue("judge-queue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
  },
});

queue.on("ready", () => {
  console.log("✅ Queue connected");
});

queue.on("error", (err) => {
  console.log("❌ Queue error:", err);
});

module.exports = queue;