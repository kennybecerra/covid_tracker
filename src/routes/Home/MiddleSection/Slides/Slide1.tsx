import * as React from 'react';
import styles from './Slide1.module.scss';
import CustomPieChart from '../../../../components/Charts/CustomPieChart/CustomPieChart';
import { KPIContainer, KPI } from '../../../../components/KPI/KPI';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../../../redux/reducers';
import { GraphState } from '../../../../redux/reducers/graphData';
import { SessionState } from '../../../../redux/reducers/session';
import { unsetFirstTimeFlag } from '../../../../redux/actions/session';
import CustomMultiLineChart from '../../../../components/Charts/CustomMultiLineChart/CustomMultiLineChart';
import { animated, useTrail } from 'react-spring';

interface Slide1Props {}
type combinedSelector = GraphState & SessionState;

const Slide1: React.FC<Slide1Props> = () => {
  const dispatch = useDispatch();
  const {
    loading,
    pieData,
    KPI: KPIData,
    timeline,
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

  const timeLineProps2 = [
    {
      type: 'linear',
      dataKey: 'new_confirmed',
      stroke: '#8884d8',
      dot: false,
      strokeWidth: 2,
    },
    {
      type: 'linear',
      dataKey: 'new_recovered',
      stroke: '#3362dd',
      dot: false,
      strokeWidth: 2,
    },
    {
      type: 'linear',
      dataKey: 'new_deaths',
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
    <div className={styles.Slide1}>
      <animated.div style={appears[0]} className={styles.graphContainer}>
        <KPIContainer type='separate'>
          <KPI data={KPIData?.['critical']} />
          <KPI data={KPIData?.['recovered']} />
          <KPI data={KPIData?.['deaths']} />
        </KPIContainer>
      </animated.div>

      <animated.div style={appears[1]} className={styles.graphContainer}>
        <KPIContainer type='connected'>
          <KPI data={KPIData?.['death_rate']} />
          <KPI data={KPIData?.['cases_per_million_population']} />
          <KPI data={KPIData?.['recovery_rate']} />
        </KPIContainer>
      </animated.div>

      <animated.div style={appears[2]} className={styles.graphContainer}>
        <KPIContainer type='connected' direction={'column'}>
          <KPI data={KPIData?.['name']} />
          <KPI data={KPIData?.['population']} />
          <KPI data={KPIData?.['updated_at']} />
        </KPIContainer>
      </animated.div>

      <animated.div style={appears[3]} className={styles.circleChart}>
        <CustomPieChart pieData={pieData} />
      </animated.div>
      <animated.div style={appears[4]} className={styles.lineChart2}>
        <CustomMultiLineChart
          data={timeline}
          scale={'linear'}
          lines={timeLineProps2}
          yAxis='new_confirmed'
          loading={loading}
        />
      </animated.div>
      <animated.div style={appears[5]} className={styles.lineChart}>
        <CustomMultiLineChart
          data={timeline}
          scale={'linear'}
          lines={timeLineProps}
          yAxis={'confirmed'}
          loading={loading}
        />
      </animated.div>
    </div>
  );
};

const MemoizedSlide1 = React.memo(Slide1);

export default MemoizedSlide1;
