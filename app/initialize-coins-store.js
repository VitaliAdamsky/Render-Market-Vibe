// app/initialize-app.js
const {
  fetchCoinsFromDb,
  storeCoinsInCache,
  initializeCoinsCache,
  fetchBybitDominantCoinsFromCache,
} = require("../functions/coins/coins-service.js");

async function initializeCoinsStore() {
  await initializeCoinsCache();
  console.log("✅ Coins Store → initialized...");
}

module.exports = { initializeCoinsStore };
