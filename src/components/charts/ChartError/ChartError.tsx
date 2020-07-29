import * as React from 'react';
import { motion } from 'framer-motion';
import styles from './ChartError.module.scss';

interface IChartError {}

const ChartError: React.FC<IChartError> = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}>
      <p className={styles.text}>No data available</p>
    </motion.div>
  );
};

const MemoizedChartError = React.memo(ChartError);

export { MemoizedChartError as ChartError };
