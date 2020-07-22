import * as React from 'react';
import { Component } from 'react';
import {
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { dataPoint } from '../../../redux/actions/types';

interface CustomMultiLineChartProps {
  data: dataPoint[];
}
const CustomMultiLineChart: React.FC<CustomMultiLineChartProps> = ({
  data,
}) => {
  const tickFormater = (tick) => {
    return new Date(tick).toDateString();
  };

  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <Line type='natural' dataKey='confirmed' stroke='#8884d8' />
        <XAxis
          scale={'time'}
          dataKey={'dateNumber'}
          type={'number'}
          domain={['dataMin', 'dataMax']}
          tickFormatter={tickFormater}
          tickCount={1}
          interval={20}
        />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  );
};

const MemoizedCustomMultiLineChart = React.memo(CustomMultiLineChart);

export default MemoizedCustomMultiLineChart;
