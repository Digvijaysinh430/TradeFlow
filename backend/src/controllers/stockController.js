const Stock = require("../models/Stock");
const { refreshPrices } = require("../services/priceService"); 

// GET /api/stocks  (protected)
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ symbol: 1 });
    res.json({ stocks });
  } catch (err) {
    console.error("Get stocks error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/stocks/refresh  (protected) — manual "refresh now"
exports.refreshStockPrices = async (req, res) => {
  try {
    const summary = await refreshPrices();
    const stocks = await Stock.find().sort({ symbol: 1 });
    res.json({ message: "Prices refreshed", summary, stocks });
  } catch (err) {
    console.error("Manual refresh error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
