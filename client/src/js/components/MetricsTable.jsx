import React from 'react';

function MetricsTable(props) {
  var {pitchMetrics} = props;
  return (
    <table className="table table-condensed table-stripe table-bordered">
      <thead>
        <tr>
          <th>Pitch Type</th>
          <th>Avg Velocity</th>
          <th>Avg Spin Rate</th>
        </tr>
      </thead>
      <tbody>
        {pitchMetrics.map(p => {
          return (
            <tr key={p.pitchType}>
              <td>{p.pitchType}</td>
              <td>{p.avgVelocity}</td>
              <td>{p.avgSpinRate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MetricsTable;
