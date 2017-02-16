import _ from 'lodash';

module.exports = {
  //find all the unique batters in the dataset and sort by batter name
  getBatters(dataset, pitcherId) {
    var batters = [];

    dataset.map(d => {
      if (d.pitcherId == pitcherId) {
        batters.push({batterId: d.batterId, batter: d.batter});
      }
    });

    batters = _.sortBy(_.uniqBy(batters, 'batterId'), (b) => b.batter);
    return batters;
  },

  getMatchupData(dataset, pitcherId, batterId) {
    var data = []

    dataset.map(d => {
      if (d.pitcherId == pitcherId && d.batterId == batterId) {
        data.push(d);
      }
    });

    return data;
  },

  countPlateAppearances(dataset) {
    var pa = [];

    dataset.map(d => {
      if (!_.includes(pa, `${d.gameDate}-${d.timesFaced}`)) {
        pa.push(`${d.gameDate}-${d.timesFaced}`);
      }
    });

    return pa.length;
  },

  countAtBats(dataset) {
    var ab = 0;
    var abResults = ['S','D','T','HR','IP_OUT','K','FC','DP','TP','ROE'];

    dataset.map(d => {
      if ((_.includes(abResults, d.paResult)) && (d.paResult.length)) {
        ab++;
      }
    });

    return ab;
  },

  paResults(dataset) {
    var bb = 0;
    var k = 0;
    var h = 0;
    var avg = 0;
    var ab = this.countAtBats(dataset);

    dataset.map(d => {
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

    return {'bb': bb, 'k': k, 'h': h, 'avg': avg};
  },

  //how the pitch selection against a specific hitter changes
  //as the game goes on, e.g, pitch selection of the first plate
  //appearance in a game vs the 3rd or 4th PA in a game.
  pitchSelectionTrend(dataset) {
    var trend = [];

    dataset.map(d => {
      //the 'name' property of obj corresponds to timesFaced. It's called 'name' to make it easier
      //to work with in the chart
      let obj = {};
      let index = _.findIndex(trend, (t) => t.name === `PA: ${d.timesFaced}`);
      if (index === -1) {
        obj.name = `PA: ${d.timesFaced}`;
        obj[d.pitchType] = 1;
        trend.push(obj);
      } else {
        obj = trend[index];
        if (obj.hasOwnProperty(d.pitchType)) {
          obj[d.pitchType]++;
        } else {
          obj[d.pitchType] = 1;
        }
        trend[index] = obj;
      }
    });

    return _.sortBy(trend, (t) => t.name);
  }
};
