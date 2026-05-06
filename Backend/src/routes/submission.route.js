const express = require("express");
const router = express.Router();

const {
  submitCode,
  getSubmissionById,
  getLeaderboard,
  getUserHistory,
  getUserStats, // 🔥 NEW
} = require("../controllers/submission.controller");

const auth = require("../middlewares/auth.middleware");

router.post("/submit", auth, submitCode);
router.get("/leaderboard", getLeaderboard);
router.get("/history", auth, getUserHistory);
router.get("/stats", auth, getUserStats); 
router.get("/:id", getSubmissionById);

module.exports = router;