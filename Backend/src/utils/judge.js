const { exec } = require("child_process");
const fs = require("fs");

exports.judge = async (code, testCases) => {
  return new Promise((resolve) => {
    fs.writeFileSync("temp.py", code);

    exec("python temp.py", (err, stdout, stderr) => {
      if (err) {
        return resolve({
          status: "Runtime Error",
          output: stderr,
        });
      }

      const output = stdout.trim();

      if (output === testCases[0].output) {
        resolve({ status: "Accepted", output });
      } else {
        resolve({ status: "Wrong Answer", output });
      }
    });
  });
};