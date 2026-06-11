const express = require("express");
const router = express.Router();
const { getStocks } = require("../controllers/stockController");
const protect = require("../middleware/auth");
const { refreshStockPrices } = require("../controllers/stockController");

router.get("/", protect, getStocks);
router.post("/refresh", protect, refreshStockPrices);

module.exports = router;