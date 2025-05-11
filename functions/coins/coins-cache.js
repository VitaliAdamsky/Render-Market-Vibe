// cache.js
const NodeCache = require("node-cache");

// Initialize cache with no expiration (stdTTL: 0)
const cache = new NodeCache({ stdTTL: 0 });

module.exports = cache;
