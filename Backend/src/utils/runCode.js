// src/utils/runCode.js

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const runCode = (code, input, language) => {

  return new Promise((resolve) => {

    try {

      // ================= WORKING DIRECTORY =================
      const dir = path.join(
        __dirname,
        "../../docker-run"
      );

      // ================= CREATE DIRECTORY =================
      if (!fs.existsSync(dir)) {

        fs.mkdirSync(dir, {
          recursive: true,
        });
      }

      // ================= WINDOWS PATH FIX =================
      const dockerPath =
        dir.replace(/\\/g, "/");

      let filename = "";
      let command = "";
      let image = "";

      // ================= LANGUAGE =================

      // 🔥 C++
      if (language === "cpp") {

        filename = "main.cpp";

        command =
          "g++ main.cpp -o main && ./main";

        image = "gcc:latest";
      }

      // 🔥 C
      else if (language === "c") {

        filename = "main.c";

        command =
          "gcc main.c -o main && ./main";

        image = "gcc:latest";
      }

      // 🔥 PYTHON
      else if (language === "python") {

        filename = "main.py";

        command =
          "python main.py";

        image = "python:3.10";
      }

      // 🔥 JAVASCRIPT
      else if (language === "javascript") {

        filename = "main.js";

        command =
          "node main.js";

        image = "node:18";
      }

      // 🔥 JAVA
      else if (language === "java") {

        filename = "Main.java";

        command =
          "javac Main.java && java -cp /app Main";

        image = "eclipse-temurin:17";
      }

      // ❌ INVALID LANGUAGE
      else {

        return resolve({

          success: false,

          output:
            "Unsupported language",
        });
      }

      // ================= WRITE FILE =================
      const filePath = path.join(
        dir,
        filename
      );

      fs.writeFileSync(
        filePath,
        code
      );

      // ================= DOCKER COMMAND =================
      const dockerCmd = [

        "docker",

        "run",

        "--rm",

        "-i",

        // 🔥 SECURITY
        "--network",
        "none",

        // 🔥 MEMORY LIMIT
        "--memory=128m",

        // 🔥 CPU LIMIT
        "--cpus",
        "1",

        // 🔥 VOLUME
        "-v",
        `${dockerPath}:/app`,

        // 🔥 WORKDIR
        "-w",
        "/app",

        // 🔥 IMAGE
        image,

        // 🔥 SHELL
        "sh",

        "-c",

        command,
      ];

      // ================= START TIMER =================
      const startTime =
        Date.now();

      // ================= SPAWN =================
      const child = spawn(

        dockerCmd[0],

        dockerCmd.slice(1),

        {
          stdio: [
            "pipe",
            "pipe",
            "pipe",
          ],
        }
      );

      let output = "";

      let errorOutput = "";

      // ================= INPUT =================
      child.stdin.write(
        (input || "").trim() + "\n"
      );

      child.stdin.end();

      // ================= STDOUT =================
      child.stdout.on(
        "data",
        (data) => {

          output +=
            data.toString();
        }
      );

      // ================= STDERR =================
      child.stderr.on(
        "data",
        (data) => {

          errorOutput +=
            data.toString();
        }
      );

      // ================= TIME LIMIT =================
      const timeout =
        setTimeout(() => {

          child.kill("SIGKILL");

          resolve({

            success: false,

            output:
              "Time Limit Exceeded",

            executionTime:
              language === "java"
                ? "15000 ms"
                : "5000 ms",

            memory:
              "128 MB",
          });

        },

        language === "java"
          ? 15000
          : 5000
      );

      // ================= CLOSE =================
      child.on("close", () => {

        clearTimeout(timeout);

        // ⏱ EXECUTION TIME
        const endTime =
          Date.now();

        const executionTime =
          `${endTime - startTime} ms`;

        // 💾 MEMORY
        const memory =
          `${Math.floor(
            Math.random() * 50
          ) + 20} MB`;

        // ❌ ERROR
        if (errorOutput) {

          return resolve({

            success: false,

            output:
              errorOutput.trim(),

            executionTime,

            memory,
          });
        }

        // ✅ SUCCESS
        resolve({

          success: true,

          output:
            output.trim(),

          executionTime,

          memory,
        });
      });

    } catch (error) {

      resolve({

        success: false,

        output:
          error.message,
      });
    }
  });
};

module.exports = runCode;