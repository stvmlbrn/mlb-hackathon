import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MetricsTable from '../components/MetricsTable';
import BiaxialLineChart from '../components/charts/BiaxialLineChart';

import metrics from '../utils/metrics';

class PitchMetrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pitchMetrics: [],
      trend: [],
      selectedPitchType: '',
      pitchTypes: [],
      //values below are used to determine y-axis scales on the chart
      spinRateMin: 0,
      spinRateMax: 0,
      velocityMin: 0,
      velocityMax: 0
    };
  }

  componentDidMount() {
    const { dataset } = this.props;
    const pitchTypes = metrics.getPitchTypes(dataset);

    this.setState({
      pitchTypes: pitchTypes,
      selectedPitchType: pitchTypes[0]
    }, this.getTrendData);
  }

  getTrendData = () => {
    const { dataset } = this.props;
    const { selectedPitchType } = this.state;
    const pitchMetrics = metrics.calculateMetrics(dataset);
    const trendData = metrics.trend(dataset, selectedPitchType);
    let velocityMin, velocityMax, spinRateMin, spinRateMax = 0;
    let v = [];
    let spin = [];

    trendData.map((t) => {
      // isNaN happens on innings with no records - need to ignore these
      if (!isNaN(t.avgVelocity)) {
        v.push(parseFloat(t.avgVelocity));
      }
      if (!isNaN(t.avgSpinRate)) {
        spin.push(parseFloat(t.avgSpinRate));
      }
    });

    velocityMin = Math.floor((v.reduce((a,b) => Math.min(a,b))) - 1);
    velocityMax = Math.ceil((v.reduce((a,b) => Math.max(a,b))) + 1);
    spinRateMin = Math.floor((spin.reduce((a,b) => Math.min(a,b))) - 50);
    spinRateMax = Math.ceil((spin.reduce((a,b) => Math.max(a,b))) + 50);

    this.setState({
      pitchMetrics: metrics.calculateMetrics(dataset),
      trend: metrics.trend(dataset, selectedPitchType),
      velocityMin: velocityMin,
      velocityMax: velocityMax,
      spinRateMin: spinRateMin,
      spinRateMax: spinRateMax
    });
  }

  selectPitch = (e) => {
    this.setState({
      selectedPitchType: e.target.value
    }, this.getTrendData);
  }

  render() {
    const { pitchMetrics, trend, velocityMin, velocityMax, spinRateMin, spinRateMax, pitchTypes } = this.state;
    return (
      <div>
        <MetricsTable pitchMetrics={pitchMetrics}/>
        <form className="form-inline well well-sm">
          <div className="form-group">
            <label htmlFor="">Select Pitch Type</label>
            <select name="selectedPitchType" onChange={this.selectPitch} className="form-control">
              {pitchTypes.map(p => <option value={p} key={p}>{p}</option>)}
            </select>
          </div>
        </form>
        <BiaxialLineChart data={trend} velocityMin={velocityMin} velocityMax={velocityMax}
          spinRateMin={spinRateMin} spinRateMax={spinRateMax}/>
      </div>
    );
  }
}

PitchMetrics.propTypes = {
  dataset: PropTypes.array.isRequired,
};

export default PitchMetrics;
