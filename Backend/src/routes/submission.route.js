const express = require("express");
const router = express.Router();

const {
  submitCode,
  getSubmissionById,
  getHistory
} = require("../controllers/submission.controller");

const auth = require("../middlewares/auth.middleware");

// ✅ Specific routes pehle
router.post("/submit", auth, submitCode);
router.get("/history", auth, getHistory);

// ✅ Dynamic route baad me
router.get("/:id", getSubmissionById);

module.exports = router;