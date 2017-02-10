import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import _ from 'lodash';

function StackedBarChart(props) {
  var {data} = props;
  var dataPoints = [];
  var colors = ['#B30D27', '#BD690E', '#0D5A77', '#35A20C', '#291983'];
  var colorIndex = -1;

  data.map(d => {
    Object.keys(d).map(key => {
      if ((key !== 'name') && (_.findIndex(dataPoints, (element) => element === key) === -1)) {
        dataPoints.push(key);
      }
    });
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      {/* <BarChart width={1000} height={300} data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}> */}
      <BarChart width={800} height={300} data={data}>
        <XAxis dataKey="name"/>
        <YAxis type="number" domain={[0, 100]}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        {dataPoints.map(d => {
          colorIndex++;
          return (
            <Bar key={d} dataKey={d} stackId="a" fill={colors[colorIndex]} />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StackedBarChart;
