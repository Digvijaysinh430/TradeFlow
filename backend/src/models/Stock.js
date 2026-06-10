const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: [true, "Symbol is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    exchange: {
      type: String,
      enum: ["NSE", "BSE"],
      default: "NSE",
    },
    sector: {
      type: String,
      trim: true,
    },
    lastPrice: {
      type: Number,
      required: [true, "Last price is required"],
      min: 0,
    },
    previousClose: {
      type: Number,
      required: [true, "Previous close is required"],
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);