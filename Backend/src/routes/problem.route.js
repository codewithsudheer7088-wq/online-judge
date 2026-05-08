const express = require("express");
const router = express.Router();

const {
  createProblem,
  getProblems,
  getProblemById,
} = require("../controllers/problem.controller");

// CREATE PROBLEM
router.post("/", createProblem);

// GET ALL PROBLEMS
router.get("/", getProblems);

// GET SINGLE PROBLEM
router.get("/:id", getProblemById);

module.exports = router;