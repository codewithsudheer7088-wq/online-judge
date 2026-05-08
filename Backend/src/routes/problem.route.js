const express = require("express");
const router = express.Router();

const Problem = require("../models/problem.model");

const {
  createProblem,
  getProblems,
  getProblemById,
} = require("../controllers/problem.controller");

// CREATE
router.post("/", createProblem);

// GET ALL
router.get("/", getProblems);

// GET BY ID
router.get("/:id", getProblemById);

// 🔥 SEED PROBLEMS
router.get("/seed/data", async (req, res) => {

  await Problem.create({
    title: "Add Two Numbers",
    description: "Add two integers",
    difficulty: "easy",

    testCases: [
      {
        input: "2 3",
        output: "5",
      },
      {
        input: "10 20",
        output: "30",
      },
    ],
  });

  await Problem.create({
    title: "Multiply Two Numbers",
    description: "Multiply two integers",
    difficulty: "medium",

    testCases: [
      {
        input: "2 3",
        output: "6",
      },
      {
        input: "10 20",
        output: "200",
      },
    ],
  });

  await Problem.create({
    title: "Factorial",
    description: "Find factorial",
    difficulty: "hard",

    testCases: [
      {
        input: "5",
        output: "120",
      },
      {
        input: "3",
        output: "6",
      },
    ],
  });

  res.send("Problems Added");
});

module.exports = router;