import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SituationForm from '../components/SituationForm';
import TrendArrow from '../components/icons/TrendArrow';
import SituationAnalysisResults from '../components/SituationAnalysisResults';

import situation from '../utils/situation';

class SituationAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: {
        runner1: false,
        runner2: false,
        runner3: false,
        balls: 'any',
        strikes: 'any',
        outs: 'any',
        batter: 'any',
        inning: 'any'
      },
      analysis: [],
      totalPitches: -1
    };
  }

  onChange = (e) => {
    const { criteria } = this.state;
    criteria[e.target.name] = e.target.value;
    this.setState({criteria: criteria});
  }

  onRunnerChange = (e) => {
    const { criteria } = this.state;
    criteria[e.target.name] = e.target.checked;
    this.setState({criteria: criteria});
  }

  analyze = (e) => {
    e.preventDefault();
    const { criteria } = this.state;
    const { dataset } = this.props;
    let totalPitches = 0;
    let results = situation.analyze(dataset, criteria);

    results.map(r => {
      totalPitches += r.count;
    });

    this.setState({
      analysis: results,
      totalPitches: totalPitches
    });
  }

  render() {
    const { criteria, analysis, totalPitches } = this.state;
    const { pitchTotals } = this.props;

    return (
      <div className="row">
        <div className="col-md-4">
          <SituationForm onSubmit={this.analyze} onChange={this.onChange} onRunnerChange={this.onRunnerChange} criteria={criteria} />
        </div>
        <div className="col-md-8">
          {(totalPitches >= 0) &&
            <SituationAnalysisResults totalPitches={totalPitches} pitchTotals={pitchTotals} analysis={analysis}/>
          }
        </div>
      </div>
    );
  }
};

SituationAnalysis.propTypes = {
  dataset: PropTypes.array.isRequired,
  pitchTotals: PropTypes.array.isRequired,
};

export default SituationAnalysis;
