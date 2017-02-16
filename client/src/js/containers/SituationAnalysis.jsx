import React, {Component} from 'react';

import SituationForm from '../components/SituationForm';
import TrendArrow from '../components/icons/TrendArrow';
import SituationAnalysisResults from '../components/SituationAnalysisResults';

import situation from '../utils/situation';

export default class extends Component {
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
    var {criteria} = this.state;
    criteria[e.target.name] = e.target.value;
    this.setState({criteria: criteria});
  }

  onRunnerChange = (e) => {
    var {criteria} = this.state;
    criteria[e.target.name] = e.target.checked;
    this.setState({criteria: criteria});
  }

  analyze = (e) => {
    e.preventDefault();
    var {criteria} = this.state;
    var {dataset} = this.props;
    var totalPitches = 0;

    var results = situation.analyze(dataset, criteria);

    results.map(r => {
      totalPitches += r.count;
    });

    this.setState({
      analysis: results,
      totalPitches: totalPitches
    });
  }

  render() {
    var {criteria, analysis, totalPitches} = this.state;
    var {pitchTotals} = this.props;

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
