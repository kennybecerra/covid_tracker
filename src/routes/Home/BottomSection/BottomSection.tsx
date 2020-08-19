import * as React from 'react';
import styles from './BottomSection.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../../redux/reducers/index';
import { SessionState } from '../../../redux/reducers/session';
import { moveSlideTo } from '../../../redux/actions/session';

interface IProps {}

const BottomSection: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { currentSlide } = useSelector<StoreState, SessionState>(
    (state) => state.session
  );

  const changeSlide = React.useCallback((num) => {
    dispatch(moveSlideTo(num));
  }, []);
  return (
    <div className={styles.BottomSection}>
      <svg preserveAspectRatio='none' className={styles.svg} viewBox='0 0 20 5'>
        <filter id='blurMe'>
          <feGaussianBlur stdDeviation='.04' />
        </filter>
        <filter id='blurBorder'>
          <feGaussianBlur stdDeviation='.04' />
        </filter>
        <g transform='translate(0,1)'>
          <path
            strokeWidth='.1px'
            fill='#0d1633'
            stroke='#141c5a'
            strokeLinejoin='round'
            filter='url(#blurBorder)'
            d='m 5 4 l 1 -4 l 8 0 l 1 4'
          />
        </g>
        <g transform='translate(0,1)'>
          <path
            className={styles.animatedMiddle}
            d='m 5 4 l 1 -4 l 8 0 l 1 4'
          />
          <path className={styles.animatedLeft} d='m 5 4 l 1 -4 l 8 0 l 1 4' />
          <path className={styles.animatedRight} d='m 5 4 l 1 -4 l 8 0 l 1 4' />
        </g>
      </svg>
      <ul className={styles.menu}>
        <li
          onClick={() => {
            changeSlide(0);
          }}
          className={`${styles.menuItem} ${
            currentSlide === 0 ? styles.active : ''
          }`}>
          <span className={styles.content}>Country</span>
        </li>
        <li
          onClick={() => {
            changeSlide(1);
          }}
          className={`${styles.menuItem} ${
            currentSlide === 1 ? styles.active : ''
          }`}>
          <span className={styles.content}>Overview</span>
        </li>
        <li
          onClick={() => {
            changeSlide(2);
          }}
          className={`${styles.menuItem} ${
            currentSlide === 2 ? styles.active : ''
          }`}>
          <span className={styles.content}>Other</span>
        </li>
      </ul>
    </div>
  );
};

const MemoizedBottomSection = React.memo(BottomSection);

export default MemoizedBottomSection;
