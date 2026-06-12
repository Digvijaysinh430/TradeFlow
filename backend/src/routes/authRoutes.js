const express = require("express");
const router = express.Router();
const { signup, login, me ,updateProfile, changePassword } = require("../controllers/authController");
const protect = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, me);
router.patch("/profile", protect, updateProfile);
router.patch("/password", protect, changePassword);

module.exports = router;