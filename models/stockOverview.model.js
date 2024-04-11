const mongoose = require("mongoose");

const StockOverviewSchema = mongoose.Schema(
  {
    ngxAmount: {
      type: String,
    },
    ngxPercent: {
      type: String,
    },
    ngxYtd: {
      type: String,
    },
    marketCapAmount: {
      type: String,
    },
    marketCapPercent: {
      type: String,
    },
    marketCapYtd: {
      type: String,
    },
    volumeAmount: {
      type: String,
    },
    volumePercent: {
      type: String,
    },
    valueAmount: {
      type: String,
    },
    valuePercent: {
      type: String,
    },
    dealsAmount: {
      type: String,
    },
    dealsPercent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const StockOverview = mongoose.model("StockOverview", StockOverviewSchema);

module.exports = StockOverview;