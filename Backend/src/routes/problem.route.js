const express = require("express");
const router = express.Router();

const {
  createProblem,
  getProblems,
  getProblemById,
} = require("../controllers/problem.controller");

router.post("/", createProblem);
router.get("/", getProblems); // 🔥 filter yaha hai
router.get("/:id", getProblemById);

module.exports = router;