import React, {Component} from 'react';
import StackedBarChart from '../components/charts/StackedBarChart';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {data} = this.props;
    return (
      <div>
        <StackedBarChart data={data.overall} />
      </div>
    );
  }
};
