import _ from 'lodash';

module.exports = {
  isStrike(pitchResult) {
    if (pitchResult === 'B' || pitchResult === 'BID' || pitchResult === 'HBP') {
      return false;
    }

    return true;
  },

  pitchSelectionTotals(dataset) {
    /*
    Calculates the total number of times a pitch was thrown, and the percentage for each pitch type out of the total number of pitches.
    */
    var totals = [];
    var totalPitches = dataset.length;

    dataset.map(d => {
      var index = _.findIndex(totals, (t) => t.pitch === d.pitchType);
      var k = this.isStrike(d.pitchResult);

      if (index === -1) {
        totals.push({
          pitch: d.pitchType,
          count: 1,
          strikes: k ? 1 : 0,
          percentage: ((1 / totalPitches) * 100).toFixed(2),
          strikePercentage: k ? 100 : 0
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

    //sort so the pitch thrown most often is first in the array
    totals = _.sortBy(totals, (t) => parseInt(t.count, 10)).reverse();

    return totals;
  },

  //return a list of colors used in charts. Designed so each pitch type is always the same color
  chartColors() {
    var colors = {
      'CH': '#B30D27',
      'CU': '#BD690E',
      'FA': '#0D5A77',
      'FT': '#35A20C',
      'FF': '#291983',
      'FC': '#b2bd78',
      'SL': '#ff540e',
      'FS': '#fdd75c',
      'SI': '#181F17',
      'FO': '#0DFFD0',
      'KN': '#13E2FF',
      'KC': '#FF0E0E',
      'SC': '#F48CC5',
      'GY': '#FFC493',
      'EP': '#589999',
      'SI': '#FDA8AA'
    };
    return colors;
  }
}
