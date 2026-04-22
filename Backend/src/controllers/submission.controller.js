const { Submission } = require("../models");
const queue = require("../queues/submission.queue");

// Submit Code
const submitCode = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    const submission = await Submission.create({
      problemId,
      code,
      language,
      status: "pending",
      userId: req.user.id,
    });

    await queue.add({
      submissionId: submission.id,
    });

    res.json({
      id: submission.id,
      status: "pending",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get One Submission
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

// FINAL FILTER: Only current user's submissions
const getHistory = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
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