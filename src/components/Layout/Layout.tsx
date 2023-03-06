import { AnimateSharedLayout, motion } from 'framer-motion';
import * as React from 'react';
import styles from './Layout.module.scss';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <AnimateSharedLayout>
      <motion.div layout className={styles.layout}>
        <div className={styles.container}>{children}</div>
        <motion.div
          initial={{
            x: '100vw',
          }}
          animate={{
            x: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 300,
            mass: 4,
            delay: 0.8,
          }}
          className={styles.block1}></motion.div>
        <motion.div
          initial={{
            y: '-100vh',
          }}
          animate={{
            y: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 300,
            mass: 4,
            delay: 0.8,
          }}
          className={styles.block2}></motion.div>
      </motion.div>
    </AnimateSharedLayout>
  );
};

const MemoizedLayout = React.memo(Layout);

export default MemoizedLayout;
