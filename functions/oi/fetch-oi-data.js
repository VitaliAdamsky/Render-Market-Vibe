// open-interest.service.js

const {
  fetchBinanceDominantCoinsFromCache,
  fetchBybitDominantCoinsFromCache,
} = require("../coins/coins-service");
const { fetchBinanceOi } = require("../binance/fetch-binance-oi");
const { fetchBybitOi } = require("../bybit/fetch-bybit-oi");

const {
  calculateExpirationTime,
} = require("../utility/calculate-expiration-time");

const {
  normalizeOpenInterestData,
} = require("../normalize/normalize-open-interest-data");

async function fetchOpenInterestData(timeframe, limit) {
  // 1. Choose the correct cache-fetch function based on timeframe
  const isDaily = timeframe === "D";
  const { bybitCoins, binanceCoins } = isDaily
    ? fetchBybitDominantCoinsFromCache()
    : fetchBinanceDominantCoinsFromCache();

  // 2. Concurrently fetch OI data from both exchanges
  const [binanceOiData, bybitOiData] = await Promise.all([
    fetchBinanceOi(binanceCoins.slice(0, 6), timeframe, limit),
    fetchBybitOi(bybitCoins.slice(0, 6), timeframe, limit),
  ]);

  // 3. Calculate when this data should expire
  const lastOpenTime =
    binanceOiData[0]?.data?.at(-1)?.openTime ??
    bybitOiData[0]?.data?.at(-1)?.openTime;
  const expirationTime = calculateExpirationTime(lastOpenTime, timeframe);

  //4. Normalize and merge
  const normalized = normalizeOpenInterestData([
    ...binanceOiData,
    ...bybitOiData,
  ]);

  return { expirationTime, data: normalized };
}

module.exports = { fetchOpenInterestData };
