const express = require("express");
const DailyPricelist = require("../models/dailyPricelist.model.js");
const router = express.Router();
const {getDailyPricelists, getDailyPricelist, createDailyPricelist, updateDailyPricelist, deleteDailyPricelist} = require('../controllers/dailyPricelist.controller.js');


router.get('/', getDailyPricelists);
router.get("/:id", getDailyPricelist);

router.post("/", createDailyPricelist);

// update a dailypricelist
router.put("/:id", updateDailyPricelist);

// delete a dailypricelist
router.delete("/:id", deleteDailyPricelist);




module.exports = router;