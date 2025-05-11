// app/initialize-app.js
const express = require("express");
const cors = require("cors");
const coinsRouter = require("../routers/coins.router.js");

async function initializeApp() {
  const allowedOrigins = [
    "https://marketvibe.app",
    "https://www.marketvibe.app",
    "http://localhost:3000",
  ];
  console.log(allowedOrigins);
  if (!Array.isArray(allowedOrigins) || allowedOrigins.length === 0) {
    throw new Error("No valid allowed origins found");
  }

  const app = express();
  app.use(express.json());
  app.use(cors({ origin: allowedOrigins }));
  console.log("coinsRouter:", coinsRouter);
  console.log("typeof coinsRouter:", typeof coinsRouter);
  app.use("/api", coinsRouter);

  return app;
}

module.exports = { initializeApp };
