import React, {Component} from 'react';

import SituationForm from '../components/SituationForm';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: {
        runner1: false,
        runner2: false,
        runner3: false,
        balls: 0,
        strikes: 0,
        batter: 'all',
        inning: 0
      }
    };
  }

  onChange = () => {

  }

  onRunnerChange = () => {

  }

  analyze = () => {

  }

  render() {
    var {criteria} = this.state;

    return (
      <div className="row">
        <div className="col-md-4">
          <SituationForm onSubmit={this.analyze} onChange={this.onChange} onRunnerChange={this.onRunnerChange} criteria={criteria} />
        </div>

      </div>
    );
  }
};
