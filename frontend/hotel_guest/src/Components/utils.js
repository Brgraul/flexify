/** Returns a string with the calculated pricing based on the price of the slider
 *
 * @param {Object} minTime: indicates the minimum possible time for the extension.
 * @param {Object} maxTime: object that indicates the maximum possible time for theextension.
 *
 * @return {Object} List of all the markers for a given couple of time constraints.
 */
export function createMarkers(minTime, maxTime) {
  const hIn = minTime.getHours();
  const hOut = maxTime.getHours();

  const n = (hOut - hIn) / 0.5;
  let markerList = [];

  for (var i = 0; i <= n; i++) {
    // The counter needs to reach equality, otherwise we would miss the last value
    const sufix = hIn + i > 12 ? "am" : "pm";
    const label =
      i % 2 === 0
        ? (hIn + i / 2).toString()
        : (hIn + parseInt(i / 2)).toString() + ":30";
    markerList.push({
      value: parseInt((100 / n) * i),
      label: label + sufix
    });
  }
  return markerList;
}

/** Returns a string with the calculated pricing based on the price of the slider
 *
 * @param {Object} minTime: indicates the minimum possible time for the extension.
 * @param {Object} maxTime: object that indicates the maximum possible time for theextension.
 *
 * @return {Object} List of all the markers for a given couple of time constraints.
 */
export function createMarkersMobile(minTime, maxTime) {
  const hIn = minTime.getHours();
  const hOut = maxTime.getHours();

  const n = hOut - hIn;
  let markerList = [];

  markerList.push({
    value: 0,
    label: hIn.toString() + ":00"
  });

  for (var i = 1; i < n; i++) {
    // The counter needs to reach equality, otherwise we would miss the last value
    markerList.push({
      value: parseInt((100 / n) * i),
      label: ""
    });
  }
  markerList.push({
    value: 100,
    label: hOut.toString() + ":00"
  });

  return markerList;
}

/** Adds padding for numbers when wanting to keep the spacing with the units
 *
 * @param {*} number: Number to add padding to.
 * @param {*} totalDigits: How many digits should the output number have
 *
 * @return {string} String representation with the padding added
 */
export function numberPadding(number, totalDigits) {
  return number < 10 * totalDigits
    ? (totalDigits - number) * " " + number
    : number;
}

export function getSliderInterval(minTime, maxTime) {
  const hIn = minTime.getHours();
  const hOut = maxTime.getHours();

  const n = Math.abs(hOut - hIn);
  const interval = 100 / n;

  return interval;
}
