import _ from 'lodash';

class Head2Head {
  /**
   * Find all the unique batters in the dataset
   * @param {array} dataset - a set of pitcher data
   * @param {number} pitcherId - the player ID of the pitcher
   * @return {array} Batters faced by the pitches sorted by name.
   */
  static getBatters(dataset, pitcherId) {
    let batters = [];

    dataset.map((d) => {
      if (d.pitcherId == pitcherId) {
        batters.push({ batterId: d.batterId, batter: d.batter });
      }
    });

    batters = _.sortBy(_.uniqBy(batters, 'batterId'), b => b.batter);
    return batters;
  }

  /**
   * Extract only the pitches from the dataset that include the provided
   * pitcher and batter
   * @param {array} dataset - a set of pitcher data
   * @param {number} pitcherId - the player ID of the pitcher
   * @param {number} batterId - the player ID of the batter
   * @return {array} An array of objects containing pitch data for the pitcher/batter matchup
   */
  static getMatchupData(dataset, pitcherId, batterId) {
    const data = [];

    dataset.map((d) => {
      if (d.pitcherId == pitcherId && d.batterId == batterId) {
        data.push(d);
      }
    });

    return data;
  }

  /**
   * Count the number of plate appearances for a batter against the pitcher.
   * @param {array} dataset - Filtered dataset that includes only pitcher vs batter data.
   * @return {number} Total number of plate appearances
   */
  static countPlateAppearances(dataset) {
    const pa = [];

    dataset.map((d) => {
      if (!_.includes(pa, `${d.gameDate}-${d.timesFaced}`)) {
        pa.push(`${d.gameDate}-${d.timesFaced}`);
      }
    });

    return pa.length;
  }

  /**
   * Count the number of at-bats for the a batter against the pitcher
   * @param {array} dataset - Filtered dataset that includes only pitcher vs batter data.
   * @return {number} Total number of at-bats
   */
  static countAtBats(dataset) {
    let ab = 0;
    const abResults = ['S', 'D', 'T', 'HR', 'IP_OUT', 'K', 'FC', 'DP', 'TP', 'ROE'];

    dataset.map(d => {
      if ((_.includes(abResults, d.paResult)) && (d.paResult.length)) {
        ab++;
      }
    });

    return ab;
  }

  /**
   * Calculate the results of the pitcher/batter matchup
   * @param {array} dataset - Filter dataset that includes only pitcher vs batter data.
   * @return {object} Batter bb, k, h, avg against the pitcher
   */
  static paResults(dataset) {
    let bb = 0;
    let k = 0;
    let h = 0;
    let avg = 0;
    const ab = this.countAtBats(dataset);

    dataset.map((d) => {
      if (d.paResult === 'K') {
        k++;
      }
      if (d.paResult === 'BB') {
        bb++;
      }
      if (d.paResult === 'S' || d.paResult === 'D' || d.paResult === 'T' || d.paResult === 'HR') {
        h++;
      }
    });

    avg = (h / ab).toFixed(3);

    if (parseFloat(avg) < 1) {
      avg = avg.toString().substring(1);
    }

    return { bb, k, h, avg };
  }

  /**
   * How the pitch selection against a specific hitter changes as the game goes on. E.g., pitch
   * selection of the first plate appearance in a game vs the 3rd or 4th PA in a game. Pitches
   * are represented as a percentage of total pitches thrown in each PA.
   * @param {array} dataset - Filtered dataset that includes only pitcher vs batter data
   * @return {array}
   */
  static pitchSelectionTrend(dataset) {
    const trend = [];

    dataset.map((d) => {
      // the 'name' property of obj corresponds to timesFaced. It's called 'name' to make it easier
      // to work with in the chart
      let obj = {};
      const index = _.findIndex(trend, t => t.name === `PA: ${d.timesFaced}`);
      if (index === -1) {
        obj.name = `PA: ${d.timesFaced}`;
        obj[d.pitchType] = 1;
        obj.totalPitches = 1;
        trend.push(obj);
      } else {
        obj = trend[index];
        if (obj.hasOwnProperty(d.pitchType)) {
          obj[d.pitchType]++;
        } else {
          obj[d.pitchType] = 1;
        }
        obj.totalPitches++;

        trend[index] = obj;
      }
    });

    // We now have a count of each pitch type per plate appearance, and the total number
    // of pitches for each plate appearance. Calculate the pitch type percentage, and then
    // remove the totalPitches from the object so it doesn't mess up the chart.
    trend.map((t) => {
      const { totalPitches } = t;
      Object.keys(t).map((key) => {
        if (key !== 'name' && key !== 'totalPitches') {
          t[key] = ((t[key] / totalPitches) * 100).toFixed(2);
        }
        delete t.totalPitches;
      });
    });

    return _.sortBy(trend, t => t.name);
  }
}

module.exports = Head2Head;
