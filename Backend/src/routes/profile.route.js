const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const {
  getProfile,
  updateProfile
} = require("../controllers/profile.controller");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);

module.exports = router;
