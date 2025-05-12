// jobs/selfPing.js

const { CronJob } = require("cron");
const ServantsConfig = require("../functions/global/servants/servants-config");

function fetchSelfPongData() {
  const config = ServantsConfig.getConfig();
  fetch(`${config.renderOiServer}/api/healthz`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("✅ Self ping sent:", data);
    })
    .catch((error) => {
      console.error("❌ Error sending self ping:", error);
    });
}

function scheduleSelfPing() {
  // Cron expression: second minute hour day month day-of-week
  // '30 0/14 * * * *' → at second 30, every 14 minutes
  const job = new CronJob(
    "30 */14 * * * *", // note: '*/14' syntax for every 14 minutes
    fetchSelfPongData, // onTick
    null, // onComplete
    true, // start right away
    "UTC" // runs in UTC; adjust if needed
  );

  console.log("⏳ Schedule Self-ping: every 14 minutes at :30s (UTC)");
}

module.exports = { scheduleSelfPing };
