import * as React from 'react';
import styles from './Layout.module.scss';
import { motion, AnimateSharedLayout } from 'framer-motion';

interface IProps {}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <AnimateSharedLayout>
      <motion.div layout className={styles.layout}>
        <motion.div layout className={styles.container}>
          {children}
        </motion.div>
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
