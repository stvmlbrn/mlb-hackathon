import _ from 'lodash';

import general from './general';

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
  }
};
