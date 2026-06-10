const Portfolio = require("../models/Portfolio");
const Stock = require("../models/Stock");

// GET /api/portfolio  (protected)
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const symbols = portfolio.holdings.map((h) => h.symbol);
    const stocks = await Stock.find({ symbol: { $in: symbols } });
    const priceMap = {};
    stocks.forEach((s) => {
      priceMap[s.symbol] = s.lastPrice;
    });

    let holdingsValue = 0;

    const holdings = portfolio.holdings.map((h) => {
      const currentPrice = priceMap[h.symbol] ?? h.avgBuyPrice;
      const investedValue = h.avgBuyPrice * h.quantity;
      const currentValue = currentPrice * h.quantity;
      const pnl = currentValue - investedValue;
      const pnlPercent = investedValue === 0 ? 0 : (pnl / investedValue) * 100;

      holdingsValue += currentValue;

      return {
        symbol: h.symbol,
        quantity: h.quantity,
        avgBuyPrice: h.avgBuyPrice,
        currentPrice,
        investedValue,
        currentValue,
        pnl,
        pnlPercent: Number(pnlPercent.toFixed(2)),
      };
    });

    const totalValue = portfolio.cashBalance + holdingsValue;

    res.json({
      cashBalance: portfolio.cashBalance,
      holdingsValue,
      totalValue,
      holdings,
    });
  } catch (err) {
    console.error("Get portfolio error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};