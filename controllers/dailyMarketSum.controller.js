const DailyMarketSum = require("../models/dailyMarketSum.model");

const getDailyMarketSums = async (req, res) => {
  try {
    const dailymarketsums = await DailyMarketSum.find({});
    res.status(200).json(dailymarketsums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDailyMarketSum = async (req, res) => {
  try {
    const { id } = req.params;
    const dailymarketsum = await DailyMarketSum.findById(id);
    res.status(200).json(dailymarketsum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDailyMarketSum = async (req, res) => {
  try {
    const dailymarketsum = await DailyMarketSum.create(req.body);
    res.status(200).json(dailymarketsum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDailyMarketSum = async (req, res) => {
  try {
    const { id } = req.params;

    const dailymarketsum = await DailyMarketSum.findByIdAndUpdate(id, req.body);

    if (!dailymarketsum) {
      return res.status(404).json({ message: "DailyMarketSum not found" });
    }

    const updatedDailyMarketSum = await DailyMarketSum.findById(id);
    res.status(200).json(updatedDailyMarketSum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDailyMarketSum = async (req, res) => {
  try {
    const { id } = req.params;

    const dailymarketsum = await DailyMarketSum.findByIdAndDelete(id);

    if (!dailymarketsum) {
      return res.status(404).json({ message: "DailyMarketSum not found" });
    }

    res.status(200).json({ message: "DailyMarketSum deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDailyMarketSums,
  getDailyMarketSum,
  createDailyMarketSum,
  updateDailyMarketSum,
  deleteDailyMarketSum,
};