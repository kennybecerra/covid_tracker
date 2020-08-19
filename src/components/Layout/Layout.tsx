import * as React from 'react';
import styles from './Layout.module.scss';
import { animated, useSpring } from 'react-spring';

interface IProps {}

const Layout: React.FC<IProps> = ({ children }) => {
  const horizontalBarStyle = useSpring({
    from: {
      x: '100vw',
    },
    to: {
      x: '0',
    },
    config: {
      mass: 5,
      tension: 250,
      friction: 58,
    },
    delay: 1000,
  });

  const verticalBarStyle = useSpring({
    from: {
      y: '-100vh',
    },
    to: {
      y: '0',
    },
    config: {
      mass: 5,
      tension: 250,
      friction: 58,
    },
    delay: 1000,
  });

  return (
    <div className={styles.layout}>
      <div className={styles.container}>{children}</div>
      <animated.div
        style={horizontalBarStyle}
        className={styles.block1}></animated.div>
      <animated.div
        style={verticalBarStyle}
        className={styles.block2}></animated.div>
    </div>
  );
};

const MemoizedLayout = React.memo(Layout);

export default MemoizedLayout;
