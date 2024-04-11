const express = require("express");
const DailyMarketSum = require("../models/dailyMarketSum.model.js");
const router = express.Router();
const {getDailyMarketSums, getDailyMarketSum, createDailyMarketSum, updateDailyMarketSum, deleteDailyMarketSum} = require('../controllers/dailyMarketSum.controller.js');


router.get('/', getDailyMarketSums);
router.get("/:id", getDailyMarketSum);

router.post("/", createDailyMarketSum);

// update a dailymarketsum
router.put("/:id", updateDailyMarketSum);

// delete a dailymarketsum
router.delete("/:id", deleteDailyMarketSum);




module.exports = router;