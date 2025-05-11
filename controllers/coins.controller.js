// controllers/coins.controller.js

const {
  fetchCoinsFromDb,
  storeCoinsInCache,
  getCoinsFromCache,
  resetCoinsCache,
} = require("../functions/coins/coins-service.js");

/**
 * GET /coins
 * Retrieves coins from cache if available; otherwise fetches from DB, caches, and returns them.
 */
async function getCoinsController(_req, res, next) {
  try {
    // 1) Attempt to get coins from in-memory cache
    let coins = getCoinsFromCache();

    // 2) If no cache hit, fetch from DB and store in cache
    if (!coins) {
      coins = await fetchCoinsFromDb();
      storeCoinsInCache(coins);
    }

    // 3) Return coins array as JSON
    return res.status(200).json({ coins });
  } catch (err) {
    // 4) On error, reset cache to avoid stale data
    resetCoinsCache();
    // Delegate error handling to Express
    return next(err);
  }
}

module.exports = { getCoinsController };
