import React from 'react';
import PropTypes from 'prop-types';

function MetricsTable(props) {
  const { pitchMetrics } = props;
  return (
    <table className="table table-condensed table-stripe table-bordered">
      <thead>
        <tr>
          <th>Pitch Type</th>
          <th>Avg Velocity</th>
          <th>Avg Spin Rate</th>
          <th>Avg Called Strike Probability</th>
        </tr>
      </thead>
      <tbody>
        {pitchMetrics.map((p) => {
          return (
            <tr key={p.pitchType}>
              <td>{p.pitchType}</td>
              <td>{p.avgVelocity}</td>
              <td>{p.avgSpinRate}</td>
              <td>{p.avgProbCalledStrike}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

MetricsTable.propTypes = {
  pitchMetrics: PropTypes.object.isRequired,
};

export default MetricsTable;
