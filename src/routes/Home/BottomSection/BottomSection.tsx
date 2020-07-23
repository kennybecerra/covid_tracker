import * as React from 'react';
import styles from './BottomSection.module.scss';

interface IProps {}

const BottomSection: React.FC<IProps> = (props) => {
  return (
    <div className={styles.BottomSection}>
      <svg
        preserveAspectRatio='none'
        className={styles.svg}
        viewBox='0 0 20 4.2'>
        <filter id='blurMe'>
          <feGaussianBlur stdDeviation='.04' />
        </filter>
        <filter id='blurBorder'>
          <feGaussianBlur stdDeviation='.04' />
        </filter>
        <g transform='translate(0,.2)'>
          <path
            strokeWidth='.1px'
            fill='#0d1633'
            stroke='#141c5a'
            strokeLinejoin='round'
            filter='url(#blurBorder)'
            d='m 5 4 l 1 -4 l 8 0 l 1 4'
          />
        </g>
        <g transform='translate(0,.2)'>
          <path
            className={styles.animatedMiddle}
            d='m 5 4 l 1 -4 l 8 0 l 1 4'
          />
          <path className={styles.animatedLeft} d='m 5 4 l 1 -4 l 8 0 l 1 4' />
          <path className={styles.animatedRight} d='m 5 4 l 1 -4 l 8 0 l 1 4' />
        </g>
      </svg>
    </div>
  );
};

const MemoizedBottomSection = React.memo(BottomSection);

export default MemoizedBottomSection;
