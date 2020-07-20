import * as React from 'react';
import styles from './BackgroundTop.module.scss';

interface IProps {}

const BackgroundTop: React.FC<IProps> = () => {
  return (
    <svg preserveAspectRatio='none' className={styles.svg} viewBox='0 0 20 4.2'>
      <filter id='blurMe'>
        <feGaussianBlur stdDeviation='.04' />
      </filter>
      <g>
        <path
          strokeWidth='.1px'
          fill='transparent'
          stroke='#141c5a'
          strokeLinejoin='round'
          d='m 0 3 l 3 0 l 1 1 l 12 0 l 1 -1 l 3 0'
        />
      </g>
      <g>
        <path
          className={styles.animatedMiddle}
          d='m 0 3 l 3 0 l 1 1 l 12 0 l 1 -1 l 3 0'
        />
        <path
          className={styles.animatedLeft}
          d='m 0 3 l 3 0 l 1 1 l 12 0 l 1 -1 l 3 0'
        />
        <path
          className={styles.animatedRight}
          d='m 0 3 l 3 0 l 1 1 l 12 0 l 1 -1 l 3 0'
        />
      </g>
    </svg>
  );
};

const MemoizedBackgroundTop = React.memo(BackgroundTop);

export default MemoizedBackgroundTop;
