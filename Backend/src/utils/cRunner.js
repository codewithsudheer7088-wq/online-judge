const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const runC = (code, input) => {
  return new Promise((resolve) => {
    try {
      const dir = path.join(__dirname, "../../docker-run");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const dockerPath = dir.replace(/\\/g, "/");

      const filePath = path.join(dir, "main.c");
      fs.writeFileSync(filePath, code);

      const command = "gcc main.c -o main && chmod +x main && ./main";

      const dockerCmd = `docker run --rm -i -v ${dockerPath}:/app -w /app gcc:latest bash -c "${command}"`;

      const child = spawn("cmd", ["/c", dockerCmd]);

      let output = "";
      let errorOutput = "";

      child.stdin.write(input + "\n");
      child.stdin.end();

      child.stdout.on("data", (d) => (output += d.toString()));
      child.stderr.on("data", (d) => (errorOutput += d.toString()));

      child.on("close", () => {
        if (errorOutput) {
          return resolve({ success: false, output: errorOutput });
        }

        resolve({ success: true, output: output.trim() });
      });

    } catch (err) {
      resolve({ success: false, output: err.message });
    }
  });
};

module.exports = runC;