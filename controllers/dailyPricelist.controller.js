const DailyPricelist = require("../models/dailyPricelist.model");

const getDailyPricelists = async (req, res) => {
  try {
    const dailypricelists = await DailyPricelist.find({});
    res.status(200).json(dailypricelists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDailyPricelist = async (req, res) => {
  try {
    const { id } = req.params;
    const dailypricelist = await DailyPricelist.findById(id);
    res.status(200).json(dailypricelist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDailyPricelist = async (req, res) => {
  try {
    const dailypricelist = await DailyPricelist.create(req.body);
    res.status(200).json(dailypricelist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDailyPricelist = async (req, res) => {
  try {
    const { id } = req.params;

    const dailypricelist = await DailyPricelist.findByIdAndUpdate(id, req.body);

    if (!dailypricelist) {
      return res.status(404).json({ message: "DailyPricelist not found" });
    }

    const updatedDailyPricelist = await DailyPricelist.findById(id);
    res.status(200).json(updatedDailyPricelist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDailyPricelist = async (req, res) => {
  try {
    const { id } = req.params;

    const dailypricelist = await DailyPricelist.findByIdAndDelete(id);

    if (!dailypricelist) {
      return res.status(404).json({ message: "DailyPricelist not found" });
    }

    res.status(200).json({ message: "DailyPricelist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDailyPricelists,
  getDailyPricelist,
  createDailyPricelist,
  updateDailyPricelist,
  deleteDailyPricelist,
};