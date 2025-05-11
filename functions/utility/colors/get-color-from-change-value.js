const chroma = require("chroma-js");

// Дивергирующая шкала: красный (-) → белый (0) → зеленый (+)
function getColorFromChangeValue(
  value,
  min,
  max,
  negativeColor = "#ff4d4d",
  neutralColor = "#ffffff",
  positiveColor = "#4dff4d"
) {
  const absMax = Math.max(Math.abs(min), Math.abs(max));
  return chroma
    .scale([negativeColor, neutralColor, positiveColor])
    .domain([-absMax, 0, absMax])
    .mode("lab")(value)
    .hex();
}

module.exports = { getColorFromChangeValue };
