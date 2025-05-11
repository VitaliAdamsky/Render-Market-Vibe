// coinService.js

const coinsCache = require("./coins-cache");
const ServantsConfigOperator = require("../global/servants/servants-config");

// Function to fetch coins from the database
async function fetchCoinsFromDb() {
  const config = ServantsConfigOperator.getConfig();
  const url = config.coinsApi;

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
  coinsCache.set("coins", coins);
}

// Function to retrieve coins from the cache
function getCoinsFromCache() {
  return coinsCache.get("coins");
}

// Function to reset the coins cache
function resetCoinsCache() {
  cache.del("coins");
}

function fetchBinanceDominantCoinsFromCache() {
  const coins = getCoinsFromCache();
  const binanceCoins = coins.filter((c) => c?.exchanges?.includes?.("Binance"));

  const bybitCoins = coins.filter(
    (c) =>
      c?.exchanges?.includes?.("Bybit") && !c?.exchanges?.includes?.("Binance")
  );

  return {
    bybitCoins,
    binanceCoins,
  };
}

function fetchBybitDominantCoinsFromCache() {
  const coins = getCoinsFromCache();
  const bybitCoins = coins.filter((c) => c?.exchanges?.includes?.("Bybit"));

  const binanceCoins = coins.filter(
    (c) =>
      c?.exchanges?.includes?.("Binance") && !c?.exchanges?.includes?.("Bybit")
  );

  return {
    bybitCoins,
    binanceCoins,
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
