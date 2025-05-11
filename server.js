// server.js

require("dotenv").config();

const { initializeApp } = require("./app/initialize-app.js");

async function main() {
  try {
    // 3) build the Express app
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
