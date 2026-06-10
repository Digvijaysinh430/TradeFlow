const Stock = require("../models/Stock");

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