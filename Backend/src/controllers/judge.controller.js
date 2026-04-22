const { Submission, Testcase } = require("../models");
const { runJavascript } = require("../utils/dockerRunner");

exports.runJudge = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.status = "running";
    await submission.save();

    const testcases = await Testcase.findAll({
      where: { problemId: submission.problemId },
      order: [["createdAt", "ASC"]]
    });

    let verdict = "accepted";

    for (const tc of testcases) {
      try {
        const output = await runJavascript(submission.code, tc.input);

        if (output.trim() !== tc.expectedOutput.trim()) {
          verdict = "wrong_answer";
          break;
        }
      } catch (err) {
        verdict = "runtime_error";
        break;
      }
    }

    submission.status = verdict;
    await submission.save();

    res.json({ message: "Judge finished", status: verdict });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
