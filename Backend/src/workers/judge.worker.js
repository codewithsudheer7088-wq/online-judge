const Queue = require("bull");
require("dotenv").config();

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const { Submission, sequelize } = require("../models");

// Queue
const judgeQueue = new Queue("judge-queue", {
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: null,
  },
});

// Temp folder
const TEMP_DIR = path.join(__dirname, "temp");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

// Run Code
function runCode(code, input, language, filePath) {
  return new Promise((resolve, reject) => {
    const inputFile = filePath + ".txt";
    fs.writeFileSync(inputFile, input);

    // Python
    if (language === "python") {
      const file = filePath + ".py";
      fs.writeFileSync(file, code);

      exec(
        `python "${file}" < "${inputFile}"`,
        { timeout: 3000 },
        (err, stdout, stderr) => {
          if (err) return reject(stderr || err.message);
          resolve(stdout.trim());
        }
      );
    }

    // JavaScript
    else if (language === "javascript") {
      const file = filePath + ".js";
      fs.writeFileSync(file, code);

      exec(
        `node "${file}" < "${inputFile}"`,
        { timeout: 3000 },
        (err, stdout, stderr) => {
          if (err) return reject(stderr || err.message);
          resolve(stdout.trim());
        }
      );
    }

    // C++
    else if (language === "cpp") {
      const file = filePath + ".cpp";
      fs.writeFileSync(file, code);

      const wslFile = file.replace(/\\/g, "/").replace("C:", "/mnt/c");
      const wslInput = inputFile.replace(/\\/g, "/").replace("C:", "/mnt/c");

      exec(
        `wsl -e sh -c "g++ '${wslFile}' -o '${wslFile}.out' && '${wslFile}.out' < '${wslInput}'"`,
        { timeout: 5000 },
        (err, stdout, stderr) => {
          if (err) return reject(stderr || err.message);
          resolve(stdout.trim());
        }
      );
    }

    // Java
    else if (language === "java") {
      const dir = path.dirname(filePath);
      const file = path.join(dir, "Main.java");

      fs.writeFileSync(file, code);

      exec(
        `javac "${file}" && java -cp "${dir}" Main < "${inputFile}"`,
        { timeout: 5000 },
        (err, stdout, stderr) => {
          if (err) return reject(stderr || err.message);
          resolve(stdout.trim());
        }
      );
    }

    else {
      reject("Unsupported language");
    }
  });
}

// Judge Logic
async function judge(submission, testCases) {
  for (let tc of testCases) {
    try {
      const filePath = path.join(TEMP_DIR, `code_${submission.id}`);

      const output = await runCode(
        submission.code,
        tc.input,
        submission.language,
        filePath
      );

      if (output !== tc.output) {
        return "Wrong Answer";
      }

    } catch (err) {
      console.log("⚠️ Runtime Error:", err);
      return "Runtime Error";
    }
  }

  return "Accepted";
}

// Worker
judgeQueue.process(async (job) => {
  try {
    const { submissionId } = job.data;

    console.log("\n🔥 Processing:", submissionId);

    const submission = await Submission.findByPk(submissionId);
    if (!submission) return;

    console.log("👉 Problem ID:", submission.problemId);
    console.log("👉 Language:", submission.language);

    const testCases = await sequelize.query(
      `SELECT * FROM public.testcases WHERE problem_id = :problemId`,
      {
        replacements: { problemId: submission.problemId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    console.log("👉 Testcases found:", testCases.length);

    if (!testCases.length) {
      await submission.update({ status: "No Testcases" });
      return;
    }

    const result = await judge(submission, testCases);

    await submission.update({ status: result });

    console.log("✅ Result:", result);

  } catch (err) {
    console.log("❌ Worker Error:", err);
  }
});

console.log("🚀 Judge Worker Started...");