import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BiaxialLineChart(props) {
  const { data, velocityMin, velocityMax, spinRateMin, spinRateMax } = props;
  const velocityDomain = [velocityMin, velocityMax];
  const spinRateDomain = [spinRateMin, spinRateMax];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" type="number" domain={spinRateDomain} stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" type="number" domain={velocityDomain} stroke="#82ca9d" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" yAxisId="left" dataKey="avgSpinRate" stroke="#8884d8" />
        <Line type="monotone" yAxisId="right" dataKey="avgVelocity" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

BiaxialLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  velocityMin: PropTypes.number.isRequired,
  velocityMax: PropTypes.number.isRequired,
  spinRateMin: PropTypes.number.isRequired,
  spinRateMax: PropTypes.number.isRequired,
};

export default BiaxialLineChart;
