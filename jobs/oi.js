// jobs/oi.js
const schedule = require("node-schedule");
const { fetchOpenInterestData } = require("../functions/oi/fetch-oi-data");
const { setOICache } = require("../functions/oi/oi-cache");
const { UnixToNamedTimeRu } = require("../functions/utility/time-converter");

const limit = 52;

async function refreshOpenInterest(timeframe, limit) {
  try {
    const data = await fetchOpenInterestData(timeframe, limit);
    setOICache(timeframe, data);
    console.log(
      `✅ [${UnixToNamedTimeRu(
        new Date().getTime()
      )}] Updated OI cache for ${timeframe}`
    );
  } catch (err) {
    console.error(
      `❌ [${UnixToNamedTimeRu(
        new Date().getTime()
      )}] Error updating OI cache for ${timeframe}:`,
      err.message
    );
  }
}

function schedule1hJob() {
  schedule.scheduleJob("0 0 * * *", { tz: "Europe/Moscow" }, () =>
    refreshOpenInterest("1h", limit)
  );
  console.log(
    "⏳ [Schedule] 1h job scheduled (Moscow time): every hour at :00"
  );
}

function schedule4hJob() {
  schedule.scheduleJob(
    "0 0 3,7,11,15,19,23 * * *",
    { tz: "Europe/Moscow" },
    () => refreshOpenInterest("4h", limit)
  );
  console.log("⏳ [Schedule] 4h job scheduled (Moscow time): every 4 hours");
}

function schedule12hJob() {
  schedule.scheduleJob("0 0 3,15 * * *", { tz: "Europe/Moscow" }, () =>
    refreshOpenInterest("12h", limit)
  );
  console.log("⏳ [Schedule] 12h job scheduled (Moscow time): twice daily");
}

// Daily at 03:00 Moscow time
function scheduleDJob() {
  schedule.scheduleJob("0 0 3 * * *", { tz: "Europe/Moscow" }, () =>
    refreshOpenInterest("D", limit)
  );
  console.log("⏳ [Schedule] Daily job scheduled (Moscow time): midnight");
}

function scheduleAllJobs() {
  schedule1hJob();
  schedule4hJob();
  schedule12hJob();
  scheduleDJob();
}

module.exports = {
  scheduleAllJobs,
};
