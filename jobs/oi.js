const schedule = require("node-schedule");
const { fetchOpenInterestData } = require("../functions/oi/fetch-oi-data");
const { setOICache } = require("../functions/oi/oi-cache");

const limit = 52;

async function refreshOpenInterest(timeframe, limit) {
  try {
    const data = await fetchOpenInterestData(timeframe, limit);
    setOICache(timeframe, data);
    console.log(`✅ Updated OI cache for ${timeframe}`);
  } catch (err) {
    console.error(`❌ Error updating OI cache for ${timeframe}:`, err.message);
  }
}

// Schedule 1h job: Every hour at minute 0 (UTC)
function schedule1hJob() {
  schedule.scheduleJob("0 * * * *", { timezone: "Europe/Moscow" }, () => {
    refreshOpenInterest("1h", limit);
  });
  console.log("[Schedule] 1h job scheduled: every hour at :00 UTC");
}

// Schedule 4h job: Every 4 hours (UTC)
function schedule4hJob() {
  schedule.scheduleJob(
    "0 3,7,11,15,19,23 * * *",
    { timezone: "Europe/Moscow" },
    () => {
      refreshOpenInterest("4h", limit);
    }
  );
  console.log("[Schedule] 4h job scheduled: every 4h at +3 UTC");
}

// Schedule 12h job: Every 12 hours (UTC)
function schedule12hJob() {
  schedule.scheduleJob("0 3,15 * * *", { timezone: "Europe/Moscow" }, () => {
    refreshOpenInterest("12h", limit);
  });
  console.log("[Schedule] 12h job scheduled: every 12h at +3 UTC");
}

// Schedule daily job: Every day at 00:00 UTC
function scheduleDJob() {
  schedule.scheduleJob("0 3 * * *", { timezone: "Europe/Moscow" }, () => {
    refreshOpenInterest("D", limit);
  });
  console.log("[Schedule] Daily job scheduled: every day at +3 UTC");
}

module.exports = {
  schedule1hJob,
  schedule4hJob,
  schedule12hJob,
  scheduleDJob,
};
