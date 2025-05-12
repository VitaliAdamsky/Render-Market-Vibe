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

const { scheduleAllJobs } = require("./jobs/oi.js");

async function main() {
  try {
    await initializeServantsConfig();

    await initializeCoinsStore();
    await initializeOpenInterestStore(3);
    const app = await initializeApp();

    scheduleSelfPing();
    scheduleAllJobs();

    const PORT = process.env.PORT || 80;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Application initialization failed:", error);
    process.exit(1);
  }
}

main();
