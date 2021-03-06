import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

import general from '../../utils/general';

const StackedBarChart = ({ data }) => {
  const dataPoints = [];
  const colors = general.chartColors();

  data.map((d) => {
    Object.keys(d).map((key) => {
      if ((key !== 'name') && (_.findIndex(dataPoints, (element) => element === key) === -1)) {
        dataPoints.push(key);
      }
    });
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={800} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 100]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {dataPoints.map(d => <Bar key={d} dataKey={d} stackId="a" fill={colors[d]} />)}
      </BarChart>
    </ResponsiveContainer>
  );
};

StackedBarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default StackedBarChart;
