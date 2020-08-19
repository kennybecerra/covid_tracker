import * as React from 'react';
import styles from './ChartError.module.scss';
import { animated } from 'react-spring';

interface IChartError {
  style: any;
}

const ChartError: React.FC<IChartError> = ({ style }) => {
  return (
    <animated.div style={style} className={styles.container}>
      <p className={styles.text}>No data available</p>
    </animated.div>
  );
};

const MemoizedChartError = React.memo(ChartError);

export { MemoizedChartError as ChartError };
