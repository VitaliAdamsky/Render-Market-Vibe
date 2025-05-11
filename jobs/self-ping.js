const schedule = require("node-schedule");
const ServantsConfig = require("../functions/global/servants/servants-config");

const config = ServantsConfig.getConfig();

function fetchSelfPingData() {
  fetch(`${config.renderOiServer}` + "/api/healthz")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Self ping sent:", data);
    })
    .catch((error) => {
      console.error("Error sending self ping:", error);
    });
}

function scheduleSelfPing() {
  schedule.scheduleJob("30 0/14 * * * *", async () => {
    fetchSelfPingData();
  });
}

module.exports = {
  scheduleSelfPing,
};
