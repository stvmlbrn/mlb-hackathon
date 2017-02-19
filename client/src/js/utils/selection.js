import _ from 'lodash'

module.exports = {
  overallPercentage(dataset) {

  },

  inningBreakdown(dataset, batter) {
    var data = [
      {name: 'Inning 1', totalPitches: 0},
      {name: 'Inning 2', totalPitches: 0},
      {name: 'Inning 3', totalPitches: 0},
      {name: 'Inning 4', totalPitches: 0},
      {name: 'Inning 5', totalPitches: 0},
      {name: 'Inning 6', totalPitches: 0},
      {name: 'Inning 7', totalPitches: 0},
      {name: 'Inning 8', totalPitches: 0},
      {name: 'Inning 9', totalPitches: 0}
    ];


    dataset.map(d => {
      if (batter === 'any' || d.batterHand === batter) {
        let index = d.inning - 1;
        let inningData = data[index];
        inningData.totalPitches++;

        if (inningData.hasOwnProperty(d.pitchType)) {
          inningData[d.pitchType]++;
        } else {
          inningData[d.pitchType] = 1;
        }

        data[index] = inningData;
      }
    });

    data.map(d => {
      var {totalPitches} = d;
      Object.keys(d).map(key => {
        if (key !== 'name' && key !== 'totalPitches') {
          d[key] = ((d[key] / totalPitches) * 100).toFixed(2);
        }
      });
      delete d.totalPitches;
    });

    return data;
  },

  overall(dataset, batter) {
    var overallData = [];
    var pitches = 0;

    dataset.map(d => {
      if (batter === 'any' || d.batterHand !== batter) {
        pitches++;
        let index = _.findIndex(overallData, (o) => o.name === d.pitchType);
        if (index === -1) {
          overallData.push({name: d.pitchType, count: 1});
        } else {
          overallData[index].count++;
        }
      }
    });

    overallData.map(o => {
      o.value = parseFloat(((o.count / pitches) * 100).toFixed(2));
      delete o.count;
    });

    return overallData;
  }
};
