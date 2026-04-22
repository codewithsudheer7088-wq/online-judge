const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/submission.controller");

router.post("/submit", auth, controller.submitCode);
router.get("/history", auth, controller.getHistory);
router.get("/:id", controller.getSubmissionById);

module.exports = router;