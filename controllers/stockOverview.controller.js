const StockOverview = require("../models/stockOverview.model");

const getStockOverviews = async (req, res) => {
  try {
    const stockoverviews = await StockOverview.find({});
    res.status(200).json(stockoverviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStockOverview = async (req, res) => {
  try {
    const { id } = req.params;
    const stockoverview = await StockOverview.findById(id);
    res.status(200).json(stockoverview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStockOverview = async (req, res) => {
  try {
    const stockoverview = await StockOverview.create(req.body);
    res.status(200).json(stockoverview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStockOverview = async (req, res) => {
  try {
    const { id } = req.params;

    const stockoverview = await StockOverview.findByIdAndUpdate(id, req.body);

    if (!stockoverview) {
      return res.status(404).json({ message: "StockOverview not found" });
    }

    const updatedStockOverview = await StockOverview.findById(id);
    res.status(200).json(updatedStockOverview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStockOverview = async (req, res) => {
  try {
    const { id } = req.params;

    const stockoverview = await StockOverview.findByIdAndDelete(id);

    if (!stockoverview) {
      return res.status(404).json({ message: "StockOverview not found" });
    }

    res.status(200).json({ message: "StockOverview deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStockOverviews,
  getStockOverview,
  createStockOverview,
  updateStockOverview,
  deleteStockOverview,
};