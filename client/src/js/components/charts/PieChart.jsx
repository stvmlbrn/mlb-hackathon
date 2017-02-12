import React from 'react';
import {PieChart, Pie, Legend, Sector, Cell, Tooltip, ResponsiveContainer} from 'recharts';

import general from '../../utils/general';

var colors = general.chartColors();

function Chart(props) {
  var {data} = props;

  data.map((d, index) => {
    d.fill = colors[index];
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie data={data} margin={{top: 20, right: 30, left: 20, bottom: 10}} label/>
        <Tooltip/>
        <Legend/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
