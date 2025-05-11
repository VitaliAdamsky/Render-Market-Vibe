// server.js
require("dotenv").config();

const { initializeApp } = require("./app/initialize-app.js");

const {
  initializeServantsConfig,
} = require("./app/initialize-servants-config.js");

const { initializeTelegramBots } = require("./app/initialize-telegram-bots.js");

const { initializeCoinsStore } = require("./app/initialize-coins-store.js");

const { initializeOpenInterestStore } = require("./app/initialize-oi-store.js");

async function main() {
  try {
    // 3) build the Express app
    await initializeServantsConfig();

    await initializeTelegramBots();
    await initializeCoinsStore();
    await initializeOpenInterestStore(3);
    const app = await initializeApp();

    // 4) start listening
    const PORT = process.env.PORT || 80;
    app.listen(PORT, "0.0.0.0", () => {
      // cron1hJob();
      // cron2hJob();
      // cron4hJob();
      // cronDJob();
    });
  } catch (error) {
    console.error("Application initialization failed:", error);
    process.exit(1);
  }
}

main();
