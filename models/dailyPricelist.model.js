const mongoose = require("mongoose");

const DailyPricelistSchema = mongoose.Schema(
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


const DailyPricelist = mongoose.model("DailyPricelist", DailyPricelistSchema);

module.exports = DailyPricelist;