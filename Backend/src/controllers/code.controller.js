const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

exports.runCode = async (req, res) => {
  try {
    const { code, language, input } = req.body;

    const tempDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const filePath = path.join(tempDir, "run_" + Date.now());
    const inputFile = filePath + ".txt";

    fs.writeFileSync(inputFile, input || "");

    // Python
    if (language === "python") {
      const file = filePath + ".py";
      fs.writeFileSync(file, code);

      exec(`python "${file}" < "${inputFile}"`, (err, stdout, stderr) => {
        if (err) return res.json({ output: stderr || err.message });
        res.json({ output: stdout });
      });
    }

    // JS
    else if (language === "javascript") {
      const file = filePath + ".js";
      fs.writeFileSync(file, code);

      exec(`node "${file}" < "${inputFile}"`, (err, stdout, stderr) => {
        if (err) return res.json({ output: stderr || err.message });
        res.json({ output: stdout });
      });
    }

    else {
      res.json({ output: "Language not added yet" });
    }

  } catch (err) {
    res.json({ output: err.message });
  }
};