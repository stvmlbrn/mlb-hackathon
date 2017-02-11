import _ from 'lodash';

import general from './general';

module.exports = {
  analyze(dataset, criteria) {
    var matched = dataset.filter(d => {
      if (
        (d.balls === parseInt(criteria.balls, 10)) &&
        (d.strikes === parseInt(criteria.strikes, 10)) &&
        (d.outs === parseInt(criteria.outs, 10)) &&
        (criteria.inning !== 'all' ? d.inning === parseInt(criteria.inning, 10) : true) &&
        (d.manOnFirst === criteria.runner1.toString()) &&
        (d.manOnSecond == criteria.runner2.toString()) &&
        (d.manOnThird == criteria.runner3.toString()) &&
        (criteria.batter !== 'all' ? d.batterHand === criteria.batter : true)
      ) {return true} else {return false}
    });

     return general.pitchSelectionTotals(matched);
  }
};
