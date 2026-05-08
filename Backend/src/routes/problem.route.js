const express = require("express");
const router = express.Router();

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

module.exports = router;