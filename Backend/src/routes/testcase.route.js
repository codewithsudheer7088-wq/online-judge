const express = require("express");
const router = express.Router();
const { createTestcase } = require("../controllers/testcase.controller");

router.post("/", createTestcase);

module.exports = router;