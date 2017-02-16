import _ from 'lodash';

import general from './general';

module.exports = {
  analyze(dataset, criteria) {
    var matched = dataset.filter(d => {
      if (
        (criteria.balls !== 'any' ? d.balls === parseInt(criteria.balls, 10) : true) &&
        (criteria.strikes !== 'any' ? d.strikes === parseInt(criteria.strikes, 10) : true) &&
        (criteria.outs !== 'any' ? d.outs === parseInt(criteria.outs, 10) : true) &&
        (criteria.inning !== 'any' ? d.inning === parseInt(criteria.inning, 10) : true) &&
        (d.manOnFirst === criteria.runner1.toString()) &&
        (d.manOnSecond == criteria.runner2.toString()) &&
        (d.manOnThird == criteria.runner3.toString()) &&
        (criteria.batter !== 'any' ? d.batterHand === criteria.batter : true)
      ) {return true} else {return false}
    });

     return general.pitchSelectionTotals(matched);
  }
};
