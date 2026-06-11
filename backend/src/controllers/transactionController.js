const Transaction = require("../models/Transaction");

// GET /api/transactions  (protected)
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    let totalBuys = 0;
    let totalSells = 0;
    let realizedPnl = 0;

    transactions.forEach((t) => {
      if (t.side === "BUY") {
        totalBuys += 1;
      } else if (t.side === "SELL") {
        totalSells += 1;
        realizedPnl += t.realizedPnl || 0;
      }
    });

    res.json({
      summary: {
        totalTrades: transactions.length,
        totalBuys,
        totalSells,
        realizedPnl: Number(realizedPnl.toFixed(2)),
      },
      transactions,
    });
  } catch (err) {
    console.error("Get transactions error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};