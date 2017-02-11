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
  }
}