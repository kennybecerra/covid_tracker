import * as React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  Brush,
} from 'recharts';
import { useTransition, animated, config } from 'react-spring';
import { ChartError } from '../ChartError/ChartError';
import styles from './CustomBarChart.module.scss';
import formatNumber from '../../../utility/formatNumber';

interface IProps {
  data: any;
}

const CustomBarChart: React.FC<IProps> = ({ data }) => {
  const flag: boolean = data.length === 0;

  const gradients = {
    deaths: {
      start: 'hsl(332, 98%, 68%)',
      end: 'hsl(344, 81%, 56%)',
      color: '#f1437d',
    },
    critical: {
      start: 'hsl(43, 92%, 72%)',
      end: 'hsl(27, 67%, 58%)',
      color: '#e09852',
    },
    recovered: {
      start: 'hsl(203, 99%, 59%)',
      end: 'hsl(230, 66%, 52%)',
      color: '#3362dd',
    },
    confirmed: {
      start: 'hsl(167, 81%, 58%)',
      end: 'hsl(192, 58%, 46%)',
      color: '#8884d8',
    },
  };

  const legendFormatter = (value, entry) => {
    return (
      <span
        style={{
          color: gradients[value].color,
          textTransform: 'capitalize',
          fontSize: 12,
          fontWeight: 700,
        }}>
        {value}
      </span>
    );
  };

  const customTooltip = (props) => {
    const { active, payload } = props;
    if (active) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.labelTitle}>{payload[0].payload.name}</p>
          {payload.map((item) => {
            return (
              <p
                key={item.dataKey}
                style={{
                  color: item.fill,
                }}
                className={styles.label}>{`${item.name} : ${formatNumber(
                item.value
              )}`}</p>
            );
          })}
        </div>
      );
    }

    return null;
  };

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
          <BarChart
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
            <XAxis dataKey='code' stroke='hsl(228,48%,50%)' />
            <YAxis
              tickFormatter={(num) => formatNumber(num, true)}
              stroke='hsl(228,48%,50%)'
            />
            <Tooltip
              contentStyle={{
                textTransform: 'capitalize',
                backgroundColor: '#161f48',
                border: '0px solid transparent',
              }}
              content={customTooltip}
            />
            <Legend
              layout='horizontal'
              align='center'
              verticalAlign='bottom'
              formatter={legendFormatter}
            />
            <Brush dataKey='code' height={20} stroke='#8884d8' fill='#0d1633' />
            <Bar dataKey='confirmed' fill='#8884d8' />
            <Bar dataKey='recovered' fill='#3362dd' />
            <Bar dataKey='critical' fill='#e09852' />
            <Bar dataKey='deaths' fill='#f1437d' />
          </BarChart>
        </ResponsiveContainer>
      </animated.div>
    );
  });
};

export default CustomBarChart;
