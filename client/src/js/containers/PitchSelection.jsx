import React, {Component} from 'react';
import StackedBarChart from '../components/charts/StackedBarChart';
import PieChart from '../components/charts/PieChart';

import selection from '../utils/selection';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChart: 'overall',
      batter: 'any',
      pitchSelectionData: {
        inningBreakdown: [],
        overall: []
      }
    }
  }

  componentDidMount() {
    this.calculatePitchSelectionData();
  }

  onChange = (e) => {
    var state = this.state;

    state[e.target.name] = e.target.value;
    this.setState(state, this.calculatePitchSelectionData);
  }

  calculatePitchSelectionData = () => {
    var {dataset} = this.props;
    var {pitchSelectionData, batter} = this.state;

    pitchSelectionData.inningBreakdown = selection.inningBreakdown(dataset, batter);
    pitchSelectionData.overall = selection.overall(dataset, batter);

    this.setState({pitchSelectionData: pitchSelectionData});
  }

  render() {
    var {pitchSelectionData, batter, selectedChart} = this.state;

    return (
      <div>
        <form className="form-inline well well-sm">
          <label>Select Chart Type:</label>
          <select name="selectedChart" className="form-control" value={selectedChart} onChange={this.onChange}>
            <option value="overall">Overall</option>
            <option value="inningBreakdown">Inning Breakdown</option>
          </select>
          <label>Batter:</label>
          <select name="batter" className="form-control" value={batter} onChange={this.onChange}>
            <option value="any">Any</option>
            <option value="L">Left Handed</option>
            <option value="R">Right Handed</option>
          </select>
        </form>

        {(selectedChart === 'overall') &&
          <div>
            <PieChart data={pitchSelectionData.overall} />
            <p className="text-center">
              <em>
              Shows the percentage thrown of each pitch type.
              </em>
            </p>
          </div>
        }

        {(selectedChart === 'inningBreakdown') &&
          <div>
            <StackedBarChart data={pitchSelectionData.inningBreakdown} />
            <p className="text-center">
              <em>
              Shows how the usage of each pitch type (shown as a percentage) changes from inning to inning.
              </em>
            </p>
          </div>
        }
      </div>
    );
  }
};
