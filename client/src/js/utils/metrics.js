import _ from 'lodash';

module.exports = {
  calculateMetrics(dataset) {
    var metrics = [];

    //When working with spin rate below, need to make sure a value exists. Some records
    //in the db don't have a spin rate recorded.

    dataset.map(d => {
      let index = _.findIndex(metrics, (m) => m.pitchType === d.pitchType);
      if (index === -1) {
        metrics.push({
          pitchType: d.pitchType,
          count: 1,
          velocity: [parseFloat(d.releaseVelocity)],
          spinRate: d.spinRate.length ? [parseFloat(d.spinRate)] : [],
          ss: d.pitchResult === 'SS' ? 1 : 0
        });
      } else {
        let obj = metrics[index];
        obj.count++;
        obj.velocity.push(parseFloat(d.releaseVelocity));
        if (d.spinRate.length) {
          obj.spinRate.push(parseFloat(d.spinRate));
        }
        if (d.pitchResult === 'SS') {
          obj.ss++;
        }

        metrics[index] = obj;
      }
    });

    metrics.map(m => {
      var avgVelocity = (m.velocity.reduce((a, b) => a + b, 0) / m.count).toFixed(1);
      var avgSpinRate = (m.spinRate.reduce((a, b) => a + b, 0) / m.spinRate.length).toFixed(2);
      var ssPercentage = (m.ss / m.count).toFixed(2);

      m.avgVelocity = avgVelocity;
      m.avgSpinRate = avgSpinRate;
      m.ssPercentage = ssPercentage;

      delete m.velocity;
      delete m.spinRate;
    });

    return metrics;
  },

  trend(dataset, pitchType) {
    var trendData = [
      {name: 'Inning 1', count: 0, velocity: [], spinRate: []},
      {name: 'Inning 2', count: 0, velocity: [], spinRate: []},
      {name: 'Inning 3', count: 0, velocity: [], spinRate: []},
      {name: 'Inning 4', count: 0, velocity: [], spinRate: []},
      {name: 'Inning 5', count: 0, velocity: [], spinRate: []},
      {name: 'Inning 6', count: 0, velocity: [], spinRate: []},
      {name: 'Inning 7', count: 0, velocity: [], spinRate: []},
      {name: 'Inning 8', count: 0, velocity: [], spinRate: []},
      {name: 'Inning 9', count: 0, velocity: [], spinRate: []}
    ];

    dataset.map(d => {
      if (d.pitchType === pitchType) {
        let index = _.findIndex(trendData, (t) => t.name === `Inning ${d.inning}`);
        trendData[index].count++;
        trendData[index].velocity.push(parseFloat(d.releaseVelocity));
        if (d.spinRate.length) {
          trendData[index].spinRate.push(parseFloat(d.spinRate));
        }
      }
    });

    trendData.map(t => {
      var avgVelocity = (t.velocity.reduce((a, b) => a + b, 0) / t.count).toFixed(1);
      var avgSpinRate = (t.spinRate.reduce((a, b) => a + b, 0) / t.spinRate.length).toFixed(2);

      t.avgVelocity = parseFloat(avgVelocity);
      t.avgSpinRate = parseFloat(avgSpinRate);

      delete t.velocity;
      delete t.spinRate;
    });

    return trendData;
  },

  getPitchTypes(dataset) { //return an array of unique pitch types thrown by the pitcher
    var pitchTypes = [];

    dataset.map(d => {
      pitchTypes.push(d.pitchType);
    });

    return _.uniq(pitchTypes).sort();
  }
};
