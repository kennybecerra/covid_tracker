import * as React from 'react';
import { Slider } from '../../../components/Slider/slider';
import Slide1 from './Slides/Slide1';
import Slide2 from './Slides/Slide2';
import styles from './MiddleSection.module.scss';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../redux/reducers/index';
import { SessionState } from '../../../redux/reducers/session';

interface MiddleSectionIProps {}

const MiddleSection: React.FC<MiddleSectionIProps> = () => {
  const { currentSlide } = useSelector<StoreState, SessionState>(
    (state) => state.session
  );

  return (
    <div className={styles.Slider}>
      <Slider index={currentSlide}>
        <Slide1 />
        <Slide2 />
        <div className={styles.background3}>
          <p>Background 3</p>
        </div>
      </Slider>
    </div>
  );
};

const MemoizedMiddleSection = React.memo(MiddleSection);

export default MemoizedMiddleSection;
