import * as React from 'react';
import styles from './MiddleSection.module.scss';
import CustomPieChart from '../../../components/Charts/CustomPieChart/CustomPieChart';
import { chartData } from '../../../types/chartData';
import { KPIContainer, KPI } from '../../../components/KPI/KPI';

interface MiddleSectionIProps {
  data: chartData;
}

const MiddleSection: React.FC<MiddleSectionIProps> = ({ data }) => {
  return (
    <div className={styles.MiddleSection}>
      <div className={styles.graphContainer}>
        <KPIContainer type='separate'>
          <KPI data={{ value: '23', key: '67' }} />
          <KPI data={{ value: '23', key: '67' }} />
          <KPI data={{ value: '23', key: '67' }} />
        </KPIContainer>
      </div>
      <div className={styles.graphContainer}>
        <KPIContainer type='connected'>
          <KPI data={{ value: '23', key: '67' }} />
          <KPI data={{ value: '23', key: '67' }} />
          <KPI data={{ value: '23', key: '67' }} />
        </KPIContainer>
      </div>
      <div className={styles.graphContainer}>
        <KPIContainer type='connected' direction={'column'}>
          <KPI data={{ value: '23', key: '67' }} />
          <KPI data={{ value: '23', key: '67' }} />
          <KPI data={{ value: '23', key: '67' }} />
        </KPIContainer>
      </div>
      <div className={styles.graphContainer}>
        <CustomPieChart data={data} />
      </div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
      <div className={styles.graphContainer}></div>
    </div>
  );
};

const MemoizedMiddleSection = React.memo(MiddleSection);

export default MemoizedMiddleSection;
