import * as React from 'react';
import { useTrail, useTransition, animated, config } from 'react-spring';
import styles from './Loading.module.scss';

interface ILoading {}
const Loading: React.FC<ILoading> = () => {
  const circleStyles = useTrail(4, {
    from: {
      opacity: 0.25,
      scale: 0.5,
    },
    to: {
      opacity: 0.5,
      scale: 1.5,
    },
    loop: { reverse: true },
    config: config.gentle,
  });

  const transition = useTransition(1, {
    from: {
      opacity: 0,
      x: 200,
    },
    enter: {
      opacity: 1,
      x: 0,
    },
    leave: {
      opacity: 0,
      x: -200,
    },
    config: config.slow,
  });

  const circles = Array.from(Array(4), (item, index) => index);

  return transition((style, item, t, i) => {
    return (
      <animated.div style={style} className={styles.container}>
        {circles.map((circleIndex) => {
          return (
            <animated.div
              key={circleIndex}
              style={circleStyles[circleIndex]}
              className={styles.ball}></animated.div>
          );
        })}
      </animated.div>
    );
  });
};

const MemoizedLoading = React.memo(Loading);

export default MemoizedLoading;
