const Portfolio = require("../models/Portfolio");
const Stock = require("../models/Stock");

// POST /api/trade/buy  (protected)
exports.buy = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;

    const qty = Number(quantity);
    if (!symbol || !Number.isInteger(qty) || qty <= 0) {
      return res
        .status(400)
        .json({ message: "Symbol and a positive integer quantity are required" });
    }

    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const portfolio = await Portfolio.findOne({ user: req.userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const cost = stock.lastPrice * qty;
    if (cost > portfolio.cashBalance) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const holding = portfolio.holdings.find((h) => h.symbol === stock.symbol);

    if (holding) {
      const totalCost = holding.avgBuyPrice * holding.quantity + cost;
      const totalQty = holding.quantity + qty;
      holding.avgBuyPrice = totalCost / totalQty;
      holding.quantity = totalQty;
    } else {
      portfolio.holdings.push({
        symbol: stock.symbol,
        quantity: qty,
        avgBuyPrice: stock.lastPrice,
      });
    }

    portfolio.cashBalance -= cost;
    await portfolio.save();

    res.json({
      message: `Bought ${qty} ${stock.symbol} @ ${stock.lastPrice}`,
      cashBalance: portfolio.cashBalance,
      holdings: portfolio.holdings,
    });
  } catch (err) {
    console.error("Buy error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/trade/sell  (protected)
exports.sell = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;

    const qty = Number(quantity);
    if (!symbol || !Number.isInteger(qty) || qty <= 0) {
      return res
        .status(400)
        .json({ message: "Symbol and a positive integer quantity are required" });
    }

    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const portfolio = await Portfolio.findOne({ user: req.userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const holding = portfolio.holdings.find((h) => h.symbol === stock.symbol);
    if (!holding || holding.quantity < qty) {
      return res
        .status(400)
        .json({ message: "Not enough shares to sell" });
    }

    const proceeds = stock.lastPrice * qty;
    holding.quantity -= qty;

    if (holding.quantity === 0) {
      portfolio.holdings = portfolio.holdings.filter(
        (h) => h.symbol !== stock.symbol
      );
    }

    portfolio.cashBalance += proceeds;
    await portfolio.save();

    res.json({
      message: `Sold ${qty} ${stock.symbol} @ ${stock.lastPrice}`,
      cashBalance: portfolio.cashBalance,
      holdings: portfolio.holdings,
    });
  } catch (err) {
    console.error("Sell error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};