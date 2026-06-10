require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Stock = require("../models/Stock");

const stocks = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", sector: "Energy", lastPrice: 2950.0, previousClose: 2910.5 },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd", sector: "IT", lastPrice: 3880.0, previousClose: 3905.2 },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Banking", lastPrice: 1685.0, previousClose: 1672.3 },
  { symbol: "INFY", name: "Infosys Ltd", sector: "IT", lastPrice: 1560.0, previousClose: 1548.9 },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Banking", lastPrice: 1240.0, previousClose: 1255.6 },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", sector: "FMCG", lastPrice: 2410.0, previousClose: 2398.0 },
  { symbol: "ITC", name: "ITC Ltd", sector: "FMCG", lastPrice: 445.0, previousClose: 441.2 },
  { symbol: "SBIN", name: "State Bank of India", sector: "Banking", lastPrice: 825.0, previousClose: 818.7 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", sector: "Telecom", lastPrice: 1520.0, previousClose: 1533.4 },
  { symbol: "LT", name: "Larsen & Toubro Ltd", sector: "Infrastructure", lastPrice: 3620.0, previousClose: 3598.1 },
];

const seedStocks = async () => {
  try {
    await connectDB();
    await Stock.deleteMany({});
    console.log("Cleared existing stocks");
    const inserted = await Stock.insertMany(stocks);
    console.log(`Seeded ${inserted.length} stocks`);
  } catch (err) {
    console.error("Seed failed:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("DB connection closed");
    process.exit(0);
  }
};

seedStocks();