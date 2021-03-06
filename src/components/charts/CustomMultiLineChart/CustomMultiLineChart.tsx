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
import { timelineDataPoint } from '../../../redux/actions/types';
import formatNumber from '../../../utility/formatNumber';
import { ChartError } from '../ChartError/ChartError';
import { useTransition, animated, config } from 'react-spring';

interface lineOption {
  type: string;
  dataKey: string;
  stroke: string;
  dot: boolean;
  strokeWidth: number;
}

interface CustomMultiLineChartProps {
  data: timelineDataPoint[];
  scale?: 'linear' | 'log';
  lines: lineOption[];
  yAxis: string;
  loading: boolean;
}
const CustomMultiLineChart: React.FC<CustomMultiLineChartProps> = ({
  data,
  scale = 'linear',
  lines,
  yAxis,
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
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor='middle'
          fill='hsl(228,48%,50%)'
          fontSize='14'
          fontWeight='500'
          transform='rotate(0)'>
          {formatDate(payload.value)}
        </text>
      </g>
    );
  };

  const labelFormater = (label) => formatDate(label);

  const tooltipFormatter = (value, name, props) => {
    return formatNumber(value);
  };

  const flag = data.length === 0;

  const transitions = useTransition(flag, {
    from: {
      opacity: 0,
      x: 0,
      y: 0,
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    leave: {
      opacity: 0,
      x: 0,
      y: 0,
    },
    config: config.molasses,
  });

  return transitions((style, item, t, i) => {
    return item ? (
      <ChartError style={style} />
    ) : (
      <animated.div style={{ ...style, width: '100%', height: '100%' }}>
        <ResponsiveContainer className={styles.background}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              left: 0,
              right: 40,
              bottom: 10,
            }}>
            <CartesianGrid
              vertical={false}
              strokeWidth={1.5}
              opacity={0.5}
              stroke='#293875'
            />
            {lines.map(({ dataKey, stroke, dot, strokeWidth }) => {
              return (
                <Line
                  key={dataKey}
                  dataKey={dataKey}
                  stroke={stroke}
                  dot={dot}
                  strokeWidth={strokeWidth}
                />
              );
            })}
            <XAxis
              scale={'time'}
              dataKey={'dateNumber'}
              type={'number'}
              domain={['dataMin', 'auto']}
              tickFormatter={tickFormater}
              interval={30}
              tick={customizedTick}
              stroke='hsl(228,48%,50%)'
            />
            <YAxis
              dataKey={yAxis}
              domain={['dataMin', 'dataMax']}
              scale={scale}
              tickFormatter={(num) => formatNumber(num, true)}
              stroke='hsl(228,48%,50%)'
              // interval='preserveStart'
              allowDataOverflow={true}
            />
            <Tooltip
              labelFormatter={labelFormater}
              formatter={tooltipFormatter}
              contentStyle={{
                textTransform: 'capitalize',
                backgroundColor: '#161f48',
                border: '0px solid transparent',
              }}
              labelStyle={{
                color: 'white',
                fontWeight: 500,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </animated.div>
    );
  });
};

const MemoizedCustomMultiLineChart = React.memo(CustomMultiLineChart);

export default MemoizedCustomMultiLineChart;
