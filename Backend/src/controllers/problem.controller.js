const { Problem } = require("../models");

// 🔥 CREATE PROBLEM
const createProblem = async (req, res) => {
  try {
    const { title, description, testCases, difficulty } = req.body;

    const problem = await Problem.create({
      title,
      description,
      testCases,
      difficulty,
    });

    res.json({
      message: "Problem created",
      problem,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET ALL (FILTER)
const getProblems = async (req, res) => {
  try {
    const { difficulty } = req.query;

    let where = {};
    if (difficulty) {
      where.difficulty = difficulty;
    }

    const problems = await Problem.findAll({ where });

    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET ONE
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);

    if (!problem) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProblem,
  getProblems,
  getProblemById,
};