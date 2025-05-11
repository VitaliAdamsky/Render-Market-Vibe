// routes/coins.router.js
const express = require("express");
const { scheduleSelfPing } = require("../jobs/self-ping.js");

const router = express.Router();
router.get("/healthz", scheduleSelfPing);

module.exports = router;
