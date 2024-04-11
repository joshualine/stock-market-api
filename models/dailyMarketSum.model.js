const mongoose = require("mongoose");

const DailyMarketSumSchema = mongoose.Schema(
  {
    reportType: {
      type: String,
    },
    date: {
      type: String,
    },
    reportLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const DailyMarketSum = mongoose.model("DailyMarketSum", DailyMarketSumSchema);

module.exports = DailyMarketSum;