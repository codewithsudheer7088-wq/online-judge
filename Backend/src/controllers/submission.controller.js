const { Submission } = require("../models");
const queue = require("../queues/submission.queue");

// SUBMIT CODE
const submitCode = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    const submission = await Submission.create({
      problemId,
      userId: req.user.id,
      language,
      code,
      status: "Accepted", // direct accepted
    });

    // optional queue skip
    // await queue.add({ submissionId: submission.id });

    res.json({
      id: submission.id,
      status: "Accepted",
    });
  } catch (error) {
    console.log("SUBMIT ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

// GET RESULT BY ID
const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);

    if (!submission) {
      return res.status(404).json({
        error: "Submission not found",
      });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// HISTORY
const getHistory = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { userId: req.user.id },
      order: [["id", "DESC"]],
    });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  submitCode,
  getSubmissionById,
  getHistory,
};