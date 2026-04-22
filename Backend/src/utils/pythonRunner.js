const { spawn } = require("child_process");

const runPython = (code, input, callback) => {

  const docker = spawn("docker", [
    "run",
    "--rm",
    "-i",
    "python:3",
    "python",
    "-c",
    code
  ]);

  let output = "";
  let errorOutput = "";

  // input pass
  docker.stdin.write(input);
  docker.stdin.end();

  docker.stdout.on("data", (data) => {
    output += data.toString();
  });

  docker.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  docker.on("close", () => {

    if (errorOutput) {
      console.log(errorOutput);   // debugging
      return callback("Runtime Error", null);
    }

    callback(null, output.trim());

  });

};

module.exports = runPython;