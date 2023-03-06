import * as React from 'react';
import styles from './Slide2.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../redux/reducers';
import { GraphState } from '../../../../redux/reducers/graphData';
import { SessionState } from '../../../../redux/reducers/session';
import { unsetFirstTimeFlag } from '../../../../redux/actions/session';
import CustomMultiLineChart from '../../../../components/Charts/CustomMultiLineChart/CustomMultiLineChart';
import { useTrail, animated } from 'react-spring';
import CustomBarChart from '../../../../components/Charts/BarChart/CustomBarChart';

interface Slide2Props {}

type combinedSelector = GraphState & SessionState;

const Slide2: React.FC<Slide2Props> = () => {
  const dispatch = useDispatch();
  const {
    countriesLoading,
    countriesData,
    globalTimelineData,
    firstTimeFlag,
  } = useSelector<StoreState, combinedSelector>((state) => {
    return {
      ...state.graphData,
      ...state.session,
    };
  });

  const timeLineProps = [
    {
      type: 'linear',
      dataKey: 'confirmed',
      stroke: '#8884d8',
      dot: false,
      strokeWidth: 2,
    },
    {
      type: 'linear',
      dataKey: 'active',
      stroke: '#e09852',
      dot: false,
      strokeWidth: 2,
    },
    {
      type: 'linear',
      dataKey: 'recovered',
      stroke: '#3362dd',
      dot: false,
      strokeWidth: 2,
    },
    {
      type: 'linear',
      dataKey: 'deaths',
      stroke: '#f1437d',
      dot: false,
      strokeWidth: 2,
    },
  ];

  const appears = useTrail(6, {
    from: {
      opacity: firstTimeFlag ? 0 : 1,
      scale: firstTimeFlag ? 0.2 : 1,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
    config: {
      mass: 3,
      tension: 280,
      friction: 39,
    },
    delay: 200,
    onRest: () => {
      if (firstTimeFlag) dispatch(unsetFirstTimeFlag());
    },
  });

  return (
    <div className={styles.slide2}>
      <animated.div style={appears[0]} className={styles.worldLineChart}>
        <CustomMultiLineChart
          data={globalTimelineData}
          scale={'linear'}
          lines={timeLineProps}
          yAxis={'confirmed'}
          loading={countriesLoading}
        />
      </animated.div>
      <animated.div style={appears[1]} className={styles.worldBarChart}>
        <CustomBarChart
          data={countriesData
            .sort((a, b) => (a.confirmed < b.confirmed ? 1 : -1))
            .slice(0, 10)}
        />
      </animated.div>
    </div>
  );
};

const MemoizedSlide2 = React.memo(Slide2);

export default MemoizedSlide2;
