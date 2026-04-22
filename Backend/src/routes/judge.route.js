const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/judge.controller");

router.post("/run/:id", auth, controller.runJudge);

module.exports = router;
