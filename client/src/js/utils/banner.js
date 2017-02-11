import _ from 'lodash';

import general from './general';

module.exports = {
  appearances(dataset) {
    return _.uniqBy(dataset, 'gameDate').length;
  },

  avgPitchCount(appearances, pitches) {
    var avg = Math.round(pitches / appearances);
    return !isNaN(avg) ? avg : 0;
  }
};
