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
import { motion, AnimatePresence } from 'framer-motion';
import { ChartError } from '../ChartError/ChartError';

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
  return (
    <AnimatePresence exitBeforeEnter>
      {data.length === 0 ? (
        <ChartError />
      ) : (
        <motion.div
          key='MiltiLineChart'
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer className={styles.background}>
            <LineChart
              data={data}
              margin={{
                top: 20,
                left: 20,
                right: 20,
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
                tickFormatter={formatNumber}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MemoizedCustomMultiLineChart = React.memo(CustomMultiLineChart);

export default MemoizedCustomMultiLineChart;
