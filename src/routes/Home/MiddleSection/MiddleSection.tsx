import * as React from 'react';
import styles from './MiddleSection.module.scss';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';

interface IMiddleSectionProps {
  data: any;
}

const MiddleSection: React.SFC<IMiddleSectionProps> = ({ data }) => {
  const pieChartData =
    data &&
    Object.keys(data.latest_data)
      .map((key) => {
        if (typeof data.latest_data[key] === 'number') {
          return {
            name: key,
            value: data.latest_data[key],
          };
        } else {
          return null;
        }
      })
      .filter((item) => item);

  const colors = ['#d33e71', '#b57541', '#33b4c3', '#3368dd'];

  const legendFormatter = (value, entry) => {
    const { color } = entry;
    return (
      <span
        style={{
          color,
          textTransform: 'capitalize',
          fontSize: 12,
          fontWeight: 700,
        }}>
        {value}
      </span>
    );
  };

  console.log(pieChartData);
  return (
    <div className={styles.MiddleSection}>
      <div className={styles.graphContainer}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey='value'
              data={pieChartData}
              innerRadius={'40%'}
              outerRadius={'60%'}
              stroke={0}
              paddingAngle={0}>
              {pieChartData &&
                pieChartData.map((entry, index) => {
                  return <Cell key={`cell-${index}`} fill={colors[index]} />;
                })}
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
      </div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
    </div>
  );
};

const MemoizedMiddleSection = React.memo(MiddleSection);

export default MemoizedMiddleSection;
