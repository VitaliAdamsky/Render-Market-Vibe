// coinService.js
const cache = require("./coins-cache");

// Function to fetch coins from the database
async function fetchCoinsFromDb() {
  const url = process.env.COINS;

  if (!url) {
    throw new Error("Missing COINS URL configuration");
  }

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${errorText}`);
  }

  const coinsData = await response.json();
  return coinsData.coins;
}

async function initializeCoinsCache() {
  const coins = await fetchCoinsFromDb();
  storeCoinsInCache(coins);
}

// Function to store coins in the cache
function storeCoinsInCache(coins) {
  cache.set("coins", coins);
}

// Function to retrieve coins from the cache
function getCoinsFromCache() {
  return cache.get("coins");
}

// Function to reset the coins cache
function resetCoinsCache() {
  cache.del("coins");
}

function fetchBinanceDominantCoinsFromCache() {
  const coins = getCoinsFromCache();
  const binancePerpCoins = coins.filter((c) =>
    c?.exchanges?.includes?.("Binance")
  );

  const bybitPerpCoins = coins.filter(
    (c) =>
      c?.exchanges?.includes?.("Bybit") && !c?.exchanges?.includes?.("Binance")
  );

  return {
    bybitPerpCoins,
    binancePerpCoins,
  };
}

function fetchBybitDominantCoinsFromCache() {
  const coins = getCoinsFromCache();
  const bybitPerpCoins = coins.filter((c) => c?.exchanges?.includes?.("Bybit"));

  const binancePerpCoins = coins.filter(
    (c) =>
      c?.exchanges?.includes?.("Binance") && !c?.exchanges?.includes?.("Bybit")
  );

  return {
    bybitPerpCoins,
    binancePerpCoins,
  };
}

module.exports = {
  fetchCoinsFromDb,
  storeCoinsInCache,
  getCoinsFromCache,
  resetCoinsCache,
  fetchBinanceDominantCoinsFromCache,
  fetchBybitDominantCoinsFromCache,
  initializeCoinsCache,
};
