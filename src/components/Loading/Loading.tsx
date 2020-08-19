import * as React from 'react';
import { motion } from 'framer-motion';
import styles from './Loading.module.scss';

const loaderVariant = {
  initial: {
    opacity: 0,
    x: 200,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -200,
  },
};

const ballVariant = {
  animate: (index) => {
    return {
      opacity: 0.4,
      scale: 2,
      transition: {
        yoyo: Infinity,
        delay: 0.05 * index,
      },
    };
  },
};

interface ILoading {}
const Loading: React.FC<ILoading> = () => {
  return (
    <motion.div
      layout
      key='loader'
      variants={loaderVariant}
      initial='initial'
      animate='animate'
      exit='exit'
      className={styles.container}>
      {Array.from(Array(4), (item, index) => index + 1).map((index) => {
        return (
          <motion.div
            layout
            variants={ballVariant}
            custom={index}
            key={index}
            animate='animate'
            className={styles.ball}></motion.div>
        );
      })}
    </motion.div>
  );
};

const MemoizedLoading = React.memo(Loading);

export default MemoizedLoading;
