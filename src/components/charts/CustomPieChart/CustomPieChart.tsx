import * as React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  Label,
  Text,
} from 'recharts';
import formatNumber from '../../../utility/formatNumber';
import styles from './CustomPieChart.module.scss';
import { covidData } from '../../../redux/actions/types';

interface CustomPieChartIProps {
  data: covidData;
}

const CustomPieChart: React.FC<CustomPieChartIProps> = ({ data }) => {
  console.log(data);
  const pieChartData =
    data &&
    Object.keys(data.latest_data)
      .map((key) => {
        if (typeof data.latest_data[key] === 'number' && key !== 'confirmed') {
          return {
            name: key,
            value: data.latest_data[key],
          };
        } else {
          return null;
        }
      })
      .filter((item) => item);

  const confirmed = data && data.latest_data.confirmed;
  const gradients = {
    deaths: {
      start: 'hsl(332, 98%, 68%)',
      end: 'hsl(344, 81%, 56%)',
      color: '#d33e71',
    },
    critical: {
      start: 'hsl(43, 92%, 72%)',
      end: 'hsl(27, 67%, 58%)',
      color: '#b57541',
    },
    recovered: {
      start: 'hsl(203, 99%, 59%)',
      end: 'hsl(230, 66%, 52%)',
      color: '#3368dd',
    },
    confirmed: {
      start: 'hsl(167, 81%, 58%)',
      end: 'hsl(192, 58%, 46%)',
      color: '#33b4c3',
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

  const renderLegend = () => {};

  return (
    <ResponsiveContainer className={styles.background}>
      <PieChart
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}>
        <defs>
          {Object.keys(gradients).map((key) => {
            return (
              <linearGradient id={key} key={key}>
                <stop offset='5%' stopColor={gradients[key].start} />
                <stop offset='95%' stopColor={gradients[key].end} />
              </linearGradient>
            );
          })}
        </defs>
        <Pie
          dataKey='value'
          data={pieChartData}
          innerRadius={'40%'}
          outerRadius={'60%'}
          stroke={0}
          paddingAngle={0}
          label>
          {pieChartData &&
            pieChartData.map((entry, index) => {
              return (
                <Cell key={`cell-${index}`} fill={`url(#${entry.name})`} />
              );
            })}
          <Label
            position='center'
            content={(props) => {
              const {
                viewBox: { cx, cy },
              } = props;
              const positioningProps = {
                x: cx,
                y: cy,
                // textAnchor: 'middle',
                // verticalAnchor: 'middle',
              };
              const presentationProps = {
                fill: '#8797d7',
                fontSize: 10,
              };

              return (
                <Text
                  className={'Testing-class'}
                  {...positioningProps}
                  {...presentationProps}
                  textAnchor={'middle'}
                  verticalAnchor={'middle'}
                  fontWeight={700}>
                  {formatNumber(confirmed)}
                </Text>
              );
            }}
          />
        </Pie>
        <Tooltip />
        <Legend
          layout='horizontal'
          align='center'
          verticalAlign='bottom'
          formatter={legendFormatter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

const MemoizedCustomPieChart = React.memo(CustomPieChart);

export default MemoizedCustomPieChart;
