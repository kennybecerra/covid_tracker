import * as React from 'react';
import styles from './MiddleSection.module.scss';
import CustomPieChart from '../../../components/Charts/CustomPieChart/CustomPieChart';
import { KPIContainer, KPI } from '../../../components/KPI/KPI';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../redux/reducers';
import { GraphState } from '../../../redux/reducers/graphData';
import CustomMultiLineChart from '../../../components/Charts/CustomMultiLineChart/CustomMultiLineChart';
import { motion } from 'framer-motion';
interface MiddleSectionIProps {}

const showVariant = {
  initial: (options) => {
    return options.parent
      ? { opacity: 1 }
      : {
          opacity: 0,
          scale: 0.2,
        };
  },
  show: (options) => {
    return options.parent
      ? {
          opacity: 1,
        }
      : {
          opacity: 1,
          scale: 1,
          transition: {
            type: 'spring',
            delay: 0.15 * options.index,
            duration: 0.5,
          },
        };
  },
  exit: (options) => {
    return !options.parent
      ? {
          opacity: 0,
        }
      : {
          opacity: 1,
        };
  },
};

const MiddleSection: React.FC<MiddleSectionIProps> = () => {
  const { loading, pieData, KPI: KPIData, timeline } = useSelector<
    StoreState,
    GraphState
  >((state) => state.graphData);

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

  return (
    <motion.div
      variants={showVariant}
      custom={{ parent: true, index: 0 }}
      initial={'initial'}
      animate={'show'}
      exit='exit'
      className={styles.MiddleSection}>
      <motion.div
        variants={showVariant}
        custom={{ parent: false, index: 1 }}
        className={styles.graphContainer}>
        <KPIContainer type='separate'>
          <KPI data={KPIData?.['critical']} />
          <KPI data={KPIData?.['recovered']} />
          <KPI data={KPIData?.['deaths']} />
        </KPIContainer>
      </motion.div>

      <motion.div
        variants={showVariant}
        custom={{ parent: false, index: 2 }}
        className={styles.graphContainer}>
        <KPIContainer type='connected'>
          <KPI data={KPIData?.['death_rate']} />
          <KPI data={KPIData?.['cases_per_million_population']} />
          <KPI data={KPIData?.['recovery_rate']} />
        </KPIContainer>
      </motion.div>

      <motion.div
        variants={showVariant}
        custom={{ parent: false, index: 3 }}
        className={styles.graphContainer}>
        <KPIContainer type='connected' direction={'column'}>
          <KPI data={KPIData?.['name']} />
          <KPI data={KPIData?.['population']} />
          <KPI data={KPIData?.['updated_at']} />
        </KPIContainer>
      </motion.div>

      <motion.div
        variants={showVariant}
        custom={{ parent: false, index: 4 }}
        className={styles.graphContainer}>
        <CustomPieChart pieData={pieData} />
      </motion.div>
      <motion.div
        variants={showVariant}
        custom={{ parent: false, index: 5 }}
        className={styles.lineChart2}>
        <CustomMultiLineChart
          data={timeline}
          scale={'linear'}
          lines={timeLineProps2}
          yAxis='new_confirmed'
          loading={loading}
        />
      </motion.div>
      <motion.div
        variants={showVariant}
        custom={{ parent: false, index: 6 }}
        className={styles.lineChart}>
        <CustomMultiLineChart
          data={timeline}
          scale={'linear'}
          lines={timeLineProps}
          yAxis={'confirmed'}
          loading={loading}
        />
      </motion.div>
    </motion.div>
  );
};

const MemoizedMiddleSection = React.memo(MiddleSection);

export default MemoizedMiddleSection;
