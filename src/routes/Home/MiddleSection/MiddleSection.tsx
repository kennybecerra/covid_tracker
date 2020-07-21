import * as React from 'react';
import styles from './MiddleSection.module.scss';
import CustomPieChart from '../../../components/Charts/CustomPieChart/CustomPieChart';
import { chartData } from '../../../types/chartData';
import { KPIContainer, KPI } from '../../../components/KPI/KPI';
import formatNumber from '../../../utility/formatNumber';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../redux/reducers';
import { GraphState } from '../../../redux/reducers/graphData';

interface MiddleSectionIProps {}

const MiddleSection: React.FC<MiddleSectionIProps> = () => {
  const { error, errorMessage, loading, data } = useSelector<
    StoreState,
    GraphState
  >((state) => state.graphData);

  const KPIData = data
    ? Object.keys(data).reduce((accu, currentKey) => {
        switch (currentKey) {
          case 'name':
            accu[currentKey] = { key: 'Country', value: data[currentKey] };
            break;
          case 'population':
            accu[currentKey] = {
              key: currentKey,
              value: formatNumber(data[currentKey]),
            };
            break;
          case 'updated_at':
            accu[currentKey] = {
              key: 'Last Update',
              value: new Date(data[currentKey]).toLocaleString(),
            };
        }

        return accu;
      }, {})
    : {};

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
          <KPI data={KPIData['name']} />
          <KPI data={KPIData['population']} />
          <KPI data={KPIData['updated_at']} />
        </KPIContainer>
      </div>
      <div className={styles.graphContainer}>
        {loading ? null : <CustomPieChart data={data} />}
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
