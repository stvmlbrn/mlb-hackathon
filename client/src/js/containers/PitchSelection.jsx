import React, {Component} from 'react';
import StackedBarChart from '../components/charts/StackedBarChart';
import PieChart from '../components/charts/PieChart';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChart: 'overall'
    }
  }

  onChange = (e) => {
    this.setState({
      selectedChart: e.target.value
    });
  }

  render() {
    var {inningBreakdown, overall} = this.props;
    var {selectedChart} = this.state;

    return (
      <div>
        <form className="form-inline well well-sm">
          <label>Select Chart Type:</label>
          <select name="selectedChart" className="form-control" value={selectedChart} onChange={this.onChange}>
            <option value="overall">Overall</option>
            <option value="inningBreakdown">Inning Breakdown</option>
          </select>
        </form>

        {(selectedChart === 'overall') &&
          <div>
            <PieChart data={overall} />
            <p className="text-center">
              <em>
              Shows the percentage thrown of each pitch regardless of
              game situation.
              </em>
            </p>
          </div>
        }

        {(selectedChart === 'inningBreakdown') &&
          <div>
            <StackedBarChart data={inningBreakdown} />
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
