import general from './general';

class Situation {
  /**
   * Analyze a user-specified game scenario and calculate pitcher trends
   * @param {array} dataset - Pitcher dataset for the entire season
   * @param {object} criteria - User defined filter criteria for the situation, ie, game scenario
   * @return {array} Pitch selection totals filtered on the provided game scenario
   */
  static analyze(dataset, criteria) {
    const matched = dataset.filter((d) => {
      if (
        (criteria.balls !== 'any' ? d.balls === parseInt(criteria.balls, 10) : true) &&
        (criteria.strikes !== 'any' ? d.strikes === parseInt(criteria.strikes, 10) : true) &&
        (criteria.outs !== 'any' ? d.outs === parseInt(criteria.outs, 10) : true) &&
        (criteria.inning !== 'any' ? d.inning === parseInt(criteria.inning, 10) : true) &&
        (d.manOnFirst === criteria.runner1.toString()) &&
        (d.manOnSecond == criteria.runner2.toString()) &&
        (d.manOnThird == criteria.runner3.toString()) &&
        (criteria.batter !== 'any' ? d.batterHand === criteria.batter : true)
      ) { return true; } else { return false; }
    });

    return general.pitchSelectionTotals(matched);
  }
}

module.exports = Situation;
