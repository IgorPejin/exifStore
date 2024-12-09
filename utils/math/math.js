function log2(number) {
  return Math.log(number) / Math.log(2);
}

function calculateEV(fnumber, exposure_time) {
  return 2 * log2(fnumber) - log2(exposure_time);
}

module.exports = calculateEV;
