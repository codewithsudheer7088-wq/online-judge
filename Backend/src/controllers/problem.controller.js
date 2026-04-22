const { Problem } = require("../models");

// ✅ GET ALL
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.findAll({
      attributes: ["id", "title"]
    });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ CREATE PROBLEM (THIS WAS MISSING)
exports.createProblem = async (req, res) => {
  try {
    const { title, description } = req.body;

    const problem = await Problem.create({
      title,
      description
    });

    res.json({
      message: "Problem created",
      data: problem
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET BY ID
exports.getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};