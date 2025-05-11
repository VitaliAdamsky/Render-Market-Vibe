// routes/coins.router.js
const express = require("express");
const { getCoinsController } = require("../controllers/coins.controller");

const router = express.Router();
router.get("/coins", getCoinsController);

module.exports = router;
