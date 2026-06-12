const Portfolio = require("../models/Portfolio");
const Stock = require("../models/Stock");

// GET /api/watchlist  (protected) — returns watched symbols enriched with price + day change
exports.getWatchlist = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const symbols = portfolio.watchlist;
    const stocks = await Stock.find({ symbol: { $in: symbols } });
    const stockMap = {};
    stocks.forEach((s) => {
      stockMap[s.symbol] = s;
    });

    const items = symbols
      .map((symbol) => {
        const stock = stockMap[symbol];
        if (!stock) return null;
        const change = stock.lastPrice - stock.previousClose;
        const changePercent =
          stock.previousClose === 0
            ? 0
            : (change / stock.previousClose) * 100;
        return {
          symbol: stock.symbol,
          name: stock.name,
          lastPrice: stock.lastPrice,
          change: Number(change.toFixed(2)),
          changePercent: Number(changePercent.toFixed(2)),
        };
      })
      .filter(Boolean);

    res.json({ watchlist: items });
  } catch (err) {
    console.error("Get watchlist error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/watchlist  (protected) — body { symbol }
exports.addToWatchlist = async (req, res) => {
  try {
    const { symbol } = req.body;
    if (!symbol) {
      return res.status(400).json({ message: "Symbol is required" });
    }

    const upper = symbol.toUpperCase();

    const stock = await Stock.findOne({ symbol: upper });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const portfolio = await Portfolio.findOne({ user: req.userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (portfolio.watchlist.includes(upper)) {
      return res.status(409).json({ message: "Already in watchlist" });
    }

    portfolio.watchlist.push(upper);
    await portfolio.save();

    res.json({ message: `${upper} added to watchlist`, watchlist: portfolio.watchlist });
  } catch (err) {
    console.error("Add to watchlist error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/watchlist/:symbol  (protected)
exports.removeFromWatchlist = async (req, res) => {
  try {
    const upper = req.params.symbol.toUpperCase();

    const portfolio = await Portfolio.findOne({ user: req.userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    portfolio.watchlist = portfolio.watchlist.filter((s) => s !== upper);
    await portfolio.save();

    res.json({ message: `${upper} removed from watchlist`, watchlist: portfolio.watchlist });
  } catch (err) {
    console.error("Remove from watchlist error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};