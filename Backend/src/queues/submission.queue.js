const queue = {
  // Fake add method
  add: async (jobData) => {
    console.log("⚡ Queue disabled");
    console.log("Job Data:", jobData);

    return {
      id: "demo-job",
    };
  },

  // Fake event listener
  on: (event, callback) => {
    console.log(`Queue event skipped: ${event}`);
  },
};

module.exports = queue;