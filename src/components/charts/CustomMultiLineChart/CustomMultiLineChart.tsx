import * as React from 'react';
import styles from './CustomMultiLineChart.module.scss';
import {
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { dataPoint } from '../../../redux/actions/types';
import formatNumber from '../../../utility/formatNumber';

interface CustomMultiLineChartProps {
  data: dataPoint[];
}
const CustomMultiLineChart: React.FC<CustomMultiLineChartProps> = ({
  data,
}) => {
  // utility

  const formatDate = (dateNum: number): string => {
    const newDate = new Date(dateNum);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${month}/${day}/${year}`;
  };

  const tickFormater = (tick) => {
    return new Date(tick).toDateString();
  };
  const customizedTick = (props) => {
    const { x, y, stroke, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor='middle'
          fill='#666'
          fontSize='14'
          fontWeight='500'
          transform='rotate(0)'>
          {formatDate(payload.value)}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer className={styles.background}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          left: 20,
          right: 20,
          bottom: 10,
        }}>
        <Line type='linear' dataKey='confirmed' stroke='#8884d8' dot={false} />
        <Line type='linear' dataKey='active' stroke='#e09852' dot={false} />
        <Line type='linear' dataKey='recovered' stroke='#3362dd' dot={false} />
        <Line type='linear' dataKey='deaths' stroke='#f1437d' dot={false} />
        <XAxis
          scale={'time'}
          dataKey={'dateNumber'}
          type={'number'}
          domain={['dataMin', 'dataMax']}
          tickFormatter={tickFormater}
          tickCount={10}
          interval={'preserveEnd'}
          tick={customizedTick}
        />
        <YAxis
          dataKey='confirmed'
          domain={[0, 'auto']}
          scale='auto'
          tickFormatter={formatNumber}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

const MemoizedCustomMultiLineChart = React.memo(CustomMultiLineChart);

export default MemoizedCustomMultiLineChart;
