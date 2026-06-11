const cron = require("node-cron");
const { refreshPrices } = require("../services/priceService");

// Refresh prices every 10 minutes.
const startPriceJob = () => {
  cron.schedule("*/10 * * * *", async () => {
    try {
      await refreshPrices();
    } catch (err) {
      console.error("Scheduled price refresh failed:", err.message);
    }
  });
  console.log("Price refresh job scheduled (every 10 minutes)");
};

module.exports = { startPriceJob };