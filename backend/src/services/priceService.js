const { NseIndia } = require("stock-nse-india");
const Stock = require("../models/Stock");

const nse = new NseIndia();

// Random-walk fallback: nudge the last price by a small random percentage.
// Used when the live API fails so the app never shows stale/broken data.
const simulatePrice = (lastPrice) => {
  const driftPercent = (Math.random() - 0.5) * 0.02; // +/- 1%
  const next = lastPrice * (1 + driftPercent);
  return Math.round(next * 100) / 100;
};

// Fetch one stock's live price from NSE. Returns a number, or null on failure.
const fetchLivePrice = async (symbol) => {
  try {
    const details = await nse.getEquityDetails(symbol);
    const price = details?.priceInfo?.lastPrice;
    if (typeof price === "number" && price > 0) {
      return Math.round(price * 100) / 100;
    }
    return null;
  } catch (err) {
    return null;
  }
};

// Refresh all stock prices. Tries live data per stock; falls back to a
// random walk on the previous price if the live fetch fails. Updates each
// Stock doc, rolling the old lastPrice into previousClose so day-change math
// stays meaningful.
const refreshPrices = async () => {
  const stocks = await Stock.find();
  let liveCount = 0;
  let fallbackCount = 0;

  await Promise.all(
    stocks.map(async (stock) => {
      const live = await fetchLivePrice(stock.symbol);
      const newPrice = live !== null ? live : simulatePrice(stock.lastPrice);

      if (live !== null) {
        liveCount += 1;
      } else {
        fallbackCount += 1;
      }

      stock.previousClose = stock.lastPrice;
      stock.lastPrice = newPrice;
      await stock.save();
    })
  );

  const summary = {
    total: stocks.length,
    live: liveCount,
    fallback: fallbackCount,
    at: new Date().toISOString(),
  };
  console.log(
    `Price refresh: ${liveCount} live, ${fallbackCount} fallback, ${stocks.length} total`
  );
  return summary;
};

module.exports = { refreshPrices };