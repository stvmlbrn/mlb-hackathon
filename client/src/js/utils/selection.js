import _ from 'lodash'

module.exports = {
  overallPercentage(dataset) {

  },

  inningBreakdown(dataset) {
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
      var index = d.inning - 1;
      var inningData = data[index];
      inningData.totalPitches++;

      if (inningData.hasOwnProperty(d.pitchType)) {
        inningData[d.pitchType]++;
      } else {
        inningData[d.pitchType] = 1;
      }

      data[index] = inningData;
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

  overall(dataset) {
    var overallData = [];

    dataset.map(d => {
      var index = _.findIndex(overallData, (o) => o.name === d.pitchType);
      if (index === -1) {
        overallData.push({name: d.pitchType, count: 1});
      } else {
        overallData[index].count++;
      }
    });

    overallData.map(o => {
      o.value = parseFloat(((o.count / dataset.length) * 100).toFixed(2));
      delete o.count;
    });

    return overallData;
  }
};
