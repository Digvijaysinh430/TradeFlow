const express = require("express");
const router = express.Router();
const { getStocks } = require("../controllers/stockController");
const protect = require("../middleware/auth");

router.get("/", protect, getStocks);

module.exports = router;