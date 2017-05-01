import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import general from '../../utils/general';

const colors = general.chartColors();

function Chart(props) {
  const { data } = props;

  // add a 'fill' object for each pitch type so it appears in the chart as a different color
  data.map((d) => {
    d.fill = colors[d.name];
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }} label />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Chart;
