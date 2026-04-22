const { spawn } = require("child_process");

const runCpp = (code, input, callback) => {

  const docker = spawn("docker", [
    "run",
    "--rm",
    "-i",
    "gcc",
    "bash",
    "-c",
    `echo '${code}' > main.cpp && g++ main.cpp -o main && echo "${input}" | ./main`
  ]);

  let output = "";
  let errorOutput = "";

  docker.stdout.on("data", (data) => {
    output += data.toString();
  });

  docker.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  docker.on("close", () => {

    if (errorOutput) {
      console.log(errorOutput);
      return callback("Runtime Error", null);
    }

    callback(null, output.trim());

  });

};

module.exports = runCpp;