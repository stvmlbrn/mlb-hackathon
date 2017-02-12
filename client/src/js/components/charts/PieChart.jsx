import React from 'react';
import {PieChart, Pie, Legend, Tooltip, ResponsiveContainer} from 'recharts';

import general from '../../utils/general';

/* const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]
*/
function Chart(props) {
  var {data} = props;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie data={data} margin={{top: 20, right: 30, left: 20, bottom: 10}} fill="#8884d8" label/>
        <Tooltip/>
        <Legend/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
