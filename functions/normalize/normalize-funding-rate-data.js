const {
  getColorFromChangeValue,
} = require("../utility/colors/get-color-from-change-value.js");
const {
  getColorFromValue,
} = require("../utility/colors/get-color-from-value.js");
const { getColorsCache } = require("../utility/colors/colors-cache.js");
function normalizeFundingRateData(marketDataArray) {
  const colors = getColorsCache();

  return marketDataArray.map((coinData) => {
    const data = coinData.data;

    // Extract fundingRate and fundingRateChange arrays
    const fundingRates = data.map((item) => item.fundingRate ?? 0);
    const fundingRateChanges = data.map((item) => item.fundingRateChange ?? 0);

    const frMin = Math.min(...fundingRates);
    const frMax = Math.max(...fundingRates);
    const frRange = frMax - frMin;
    const frUniform = frRange === 0;

    const frChangeMin = Math.min(...fundingRateChanges);
    const frChangeMax = Math.max(...fundingRateChanges);

    const updatedData = data.map((item) => {
      const fundingRate = item.fundingRate ?? 0;
      const fundingRateChange = item.fundingRateChange ?? 0;

      const normalizedFr = frUniform ? 1 : (fundingRate - frMin) / frRange;

      const frColor = getColorFromValue(
        normalizedFr,
        colors.fundingRateMin,
        colors.fundingRateMax
      );
      const frChangeColor = getColorFromChangeValue(
        fundingRateChange,
        frChangeMin,
        frChangeMax,
        colors.fundingRateChangeMin,
        colors.fundingRateChangeMax
      );

      return {
        ...item,
        normalizedFundingRate: Number(normalizedFr.toFixed)(2),
        colors: {
          ...(item.colors || {}),
          fundingRate: frColor,
          fundingRateChange: frChangeColor,
        },
      };
    });

    return {
      ...coinData,
      data: updatedData,
    };
  });
}

module.exports = { normalizeFundingRateData };
