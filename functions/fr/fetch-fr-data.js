// open-interest.service.js
const { fetchBinanceFr } = require("../binance/fetch-binance-fr");
const { fetchBybitFr } = require("../bybit/fetch-bybit-fr");

const {
  fetchBinanceDominantCoinsFromCache,
} = require("../coins/coins-service");

const {
  calculateExpirationTime,
} = require("../utility/calculate-expiration-time");

const {
  normalizeFundingRateData,
} = require("../normalize/normalize-funding-rate-data");

async function fetchFundingRateData(limit) {
  // 1. Choose the correct cache-fetch function based on timeframe

  const { binanceCoins, bybitCoins } = fetchBinanceDominantCoinsFromCache();

  // 2. Concurrently fetch OI data from both exchanges
  const [binanceFrData, bybitFrData] = await Promise.all([
    fetchBinanceFr(binanceCoins.slice(0, 4), limit),
    fetchBybitFr(bybitCoins.slice(0, 4), limit),
  ]);

  // 3. Calculate when this data should expire
  const lastOpenTime =
    bybitFrData[0]?.data?.at(-1)?.openTime ??
    bybitFrData[0]?.data?.at(-1)?.openTime;

  const lastCloseTime =
    bybitFrData[0]?.data?.at(-1)?.closeTime ??
    bybitFrData[0]?.data?.at(-1)?.closeTime;

  const expirationTime = lastCloseTime + (lastCloseTime - lastOpenTime) + 1;

  // 4. Normalize and merge
  const normalized = normalizeFundingRateData([
    ...binanceFrData,
    ...bybitFrData,
  ]);

  return { expirationTime, data: normalized };
}

module.exports = { fetchFundingRateData };
