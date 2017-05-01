import _ from 'lodash';

class General {
  /**
   * Determines if the pitch result was a strike
   * @param {string} pitchResult - The code for the pitch result
   * @return {boolean} True if a pitch was a strike, otherwise false
   */
  static isStrike(pitchResult) {
    if (pitchResult === 'B' || pitchResult === 'BID' || pitchResult === 'HBP') {
      return false;
    }

    return true;
  }

  /**
   * Calculates specific data for each type of pitch thrown
   * @param {array} dataset - A set of pitch data for a pitcher
   * @return {array} A sorted array of objects with data on each type of pitch thrown.
   */
  static pitchSelectionTotals(dataset) {
    let totals = [];
    const totalPitches = dataset.length;

    dataset.map((d) => {
      const index = _.findIndex(totals, t => t.pitch === d.pitchType);
      const k = this.isStrike(d.pitchResult);

      if (index === -1) {
        totals.push({
          pitch: d.pitchType,
          count: 1,
          strikes: k ? 1 : 0,
          percentage: ((1 / totalPitches) * 100).toFixed(2),
          strikePercentage: k ? 100 : 0,
        });
      } else {
        totals[index].count++;
        totals[index].percentage = ((totals[index].count / totalPitches) * 100).toFixed(2);
        if (k) {
          totals[index].strikes++;
          totals[index].strikePercentage = ((totals[index].strikes / totals[index].count) * 100).toFixed(2);
        }
      }
    });

    // sort so the pitch thrown most often is first in the array
    totals = _.sortBy(totals, t => parseInt(t.count, 10)).reverse();

    return totals;
  }

  /**
   * Return a list of colors used in charts. Used so each pitch type is always the same color
   * in charts
   * @return {object} An object matching pitch types with a specific color
   */
  static chartColors() {
    const colors = {
      CH: '#B30D27',
      CU: '#BD690E',
      FA: '#0D5A77',
      FT: '#35A20C',
      FF: '#291983',
      FC: '#b2bd78',
      SL: '#ff540e',
      FS: '#fdd75c',
      SI: '#181F17',
      FO: '#0DFFD0',
      KN: '#13E2FF',
      KC: '#FF0E0E',
      SC: '#F48CC5',
      GY: '#FFC493',
      EP: '#589999',
    };
    return colors;
  }
}

module.exports = General;
