// app/initialize-app.js
const express = require("express");
const cors = require("cors");
const coinsRouter = require("../routers/coins.router.js");
const oiRouter = require("../routers/oi.router.js");
const generalRouter = require("../routers/general.js");
const ServantsConfigOperator = require("../functions/global/servants/servants-config.js");

async function initializeApp() {
  const allowedOrigins = ServantsConfigOperator.getConfig().allowedOrigins;

  if (!Array.isArray(allowedOrigins) || allowedOrigins.length === 0) {
    throw new Error("No valid allowed origins found");
  }

  const app = express();
  app.use(express.json());
  app.use(cors({ origin: allowedOrigins }));

  app.use("/api", coinsRouter);
  app.use("/api", oiRouter);
  app.use("/api", generalRouter);

  return app;
}

module.exports = { initializeApp };
