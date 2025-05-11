// routes/coins.router.js
const express = require("express"); // Import Express :contentReference[oaicite:2]{index=2}
const { getOpenInterestController } = require("../controllers/oi.controller");

const router = express.Router(); // ← This is the function that Express.use() expects :contentReference[oaicite:3]{index=3}

/**
 * GET /coins
 * Retrieves coins (from cache or DB).
 */
router.get("/oi", getOpenInterestController);

module.exports = router; // ← Export the router directly, not as a property on an object :contentReference[oaicite:4]{index=4}
