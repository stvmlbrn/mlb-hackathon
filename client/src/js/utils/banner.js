import _ from 'lodash';

module.exports = {
  appearances(dataset) {
    var games = [];

    dataset.map(d => {
      if (_.findIndex(games, (g) => g === d.gameDate) === -1) {
        games.push(d.gameDate);
      }
    });

    return games.length;
  },

  avgPitchCount(appearances, pitches) {
    var avg = Math.round(pitches / appearances);
    return !isNaN(avg) ? avg : 0;
  },

  pitchSelectionTotals(dataset) {
    var totals = [];
    var totalPitches = dataset.length;

    dataset.map(d => {
      var index = _.findIndex(totals, (t) => t.pitch === d.pitchType);

      if (index === -1) {
        totals.push({
          pitch: d.pitchType,
          count: 1,
          percentage: 1 / totalPitches
        });
      } else {
        totals[index].count++;
        totals[index].percentage = ((totals[index].count / totalPitches) * 100).toFixed(2);
      }
    });

    return totals;
  }
};
