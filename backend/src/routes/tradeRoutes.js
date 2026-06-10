const express = require("express");
const router = express.Router();
const { buy, sell } = require("../controllers/tradeController");
const protect = require("../middleware/auth");

router.post("/buy", protect, buy);
router.post("/sell", protect, sell);

module.exports = router;