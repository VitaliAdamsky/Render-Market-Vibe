// routes/coins.router.js
const express = require("express"); // Import Express :contentReference[oaicite:2]{index=2}
const { getOpenInterestController } = require("../controllers/oi.controller");

const {
  refreshOpenInterestStoreController,
} = require("../controllers/oi.controller");

const router = express.Router();
router.get("/oi", getOpenInterestController);
router.get("/oi/refresh", refreshOpenInterestStoreController);

module.exports = router;
