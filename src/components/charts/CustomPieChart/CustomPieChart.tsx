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
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CustomPieChart.module.scss';
import { PieData } from '../../../redux/actions/types';
import { ChartError } from '../ChartError/ChartError';

interface CustomPieChartIProps {
  pieData: PieData;
}

const CustomPieChart: React.FC<CustomPieChartIProps> = ({ pieData }) => {
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
          <p
            style={{
              color: payload[0].payload.fill,
            }}
            className={styles.label}>{`${payload[0].name} : ${formatNumber(
            payload[0].value
          )}`}</p>
        </div>
      );
    }

    return null;
  };

  const dataNotAvailable = pieData?.slices.every((item) => item.value === 0);
  return (
    <AnimatePresence exitBeforeEnter>
      {dataNotAvailable ? (
        <ChartError />
      ) : (
        <motion.div
          layout
          key='CustomPieChart'
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          style={{ width: '100%', height: '100%' }}>
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
                data={pieData?.slices}
                innerRadius={'50%'}
                outerRadius={'80%'}
                stroke={0}
                paddingAngle={0}>
                {pieData &&
                  pieData.slices.map((entry, index) => {
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={gradients[entry.name].color}
                      />
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
                      fill: '#8884d8',
                      fontSize: 16,
                    };

                    return (
                      <Text
                        className={'Testing-class'}
                        {...positioningProps}
                        {...presentationProps}
                        textAnchor={'middle'}
                        verticalAnchor={'middle'}
                        fontWeight={700}>
                        {formatNumber(pieData.total)}
                      </Text>
                    );
                  }}
                />
              </Pie>
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
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MemoizedCustomPieChart = React.memo(CustomPieChart);

export default MemoizedCustomPieChart;
