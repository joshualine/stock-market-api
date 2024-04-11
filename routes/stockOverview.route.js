const express = require("express");
const StockOverview = require("../models/stockOverview.model.js");
const router = express.Router();
const {getStockOverviews, getStockOverview, createStockOverview, updateStockOverview, deleteStockOverview} = require('../controllers/stockOverview.controller.js');


router.get('/', getStockOverviews);
router.get("/:id", getStockOverview);

router.post("/", createStockOverview);

// update a stockoverview
router.put("/:id", updateStockOverview);

// delete a stockoverview
router.delete("/:id", deleteStockOverview);




module.exports = router;