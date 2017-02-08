import _ from 'lodash';

module.exports = {
  appearances(dataset) {
    var games = [];

    dataset.map(d => {
      if (_.findIndex(games, function(g) {return g === d.gameDate}) === -1) {
        games.push(d.gameDate);
      }
    });

    return games.length;
  },

  avgPitchCount(appearances, pitches) {
    return Math.round(pitches / appearances);
  }
};
