import _ from 'lodash';

class Banner {
  /**
   * Calculate the number of appearances for a pitcher
   * @param {array} dataset - a set of pitcher data (complete season)
   * @return {number} Total number of appearances
   */
  static appearances(dataset) {
    return _.uniqBy(dataset, 'gameDate').length;
  }

  /**
   * Calcuate the average pitch count per appearance for a pitcher
   * @param {number} appearances - number of appearances
   * @param {number} pitches - total number of pitches thrown for the season
   * @return {number} Average pitches per appearance, or 0 if no appearances found.
   */
  static avgPitchCount(appearances, pitches) {
    const avg = Math.round(pitches / appearances);
    return !isNaN(avg) ? avg : 0;
  }
}

module.exports = Banner;
