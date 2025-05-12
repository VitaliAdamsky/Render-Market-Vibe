// server.js
require("dotenv").config();

const { initializeApp } = require("./app/initialize-app.js");

const { scheduleSelfPing } = require("./jobs/self-ping.js");

const {
  initializeServantsConfig,
} = require("./app/initialize-servants-config.js");

const { initializeTelegramBots } = require("./app/initialize-telegram-bots.js");

const { initializeCoinsStore } = require("./app/initialize-coins-store.js");

const { initializeOpenInterestStore } = require("./app/initialize-oi-store.js");

const { initializeFundingRateStore } = require("./app/initialize-fr-store.js");

const { scheduleAllOiJobs } = require("./jobs/oi.js");

const { scheduleAllFrJobs } = require("./jobs/fr.js");

const {
  setInitialColors,
} = require("./functions/utility/colors/colors-cache.js");

async function main() {
  try {
    await initializeServantsConfig();

    await initializeCoinsStore();
    await initializeOpenInterestStore();
    await initializeFundingRateStore();

    const app = await initializeApp();

    scheduleSelfPing();
    scheduleAllOiJobs();
    scheduleAllFrJobs();
    setInitialColors();

    const PORT = process.env.PORT || 80;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✳️  Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Application initialization failed:", error);
    process.exit(1);
  }
}

main();
