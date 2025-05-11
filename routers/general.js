// routes/coins.router.js
const express = require("express");
const { sendSelfPing } = require("../controllers/general.controller"); // Import Express

const router = express.Router();
router.get("/healthz", sendSelfPing);

module.exports = router;
