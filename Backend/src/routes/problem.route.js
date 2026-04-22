const express = require("express");
const router = express.Router();

// ✅ IMPORT ALL FUNCTIONS
const {
  getAllProblems,
  createProblem,
  getProblemById
} = require("../controllers/problem.controller");

router.get("/", getAllProblems);
router.post("/", createProblem);
router.get("/:id", getProblemById);

module.exports = router;