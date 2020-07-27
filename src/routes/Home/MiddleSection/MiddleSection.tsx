import * as React from 'react';
import styles from './MiddleSection.module.scss';
import CustomPieChart from '../../../components/Charts/CustomPieChart/CustomPieChart';
import { KPIContainer, KPI } from '../../../components/KPI/KPI';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../redux/reducers';
import { GraphState } from '../../../redux/reducers/graphData';
import CustomMultiLineChart from '../../../components/Charts/CustomMultiLineChart/CustomMultiLineChart';
interface MiddleSectionIProps {}

const MiddleSection: React.FC<MiddleSectionIProps> = () => {
  const {
    error,
    errorMessage,
    loading,
    data,
    KPI: KPIData,
    timeline,
  } = useSelector<StoreState, GraphState>((state) => state.graphData);

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
    <div className={styles.MiddleSection}>
      <div className={styles.graphContainer}>
        <KPIContainer type='separate'>
          <KPI data={KPIData?.['critical']} />
          <KPI data={KPIData?.['recovered']} />
          <KPI data={KPIData?.['deaths']} />
        </KPIContainer>
      </div>

      <div className={styles.graphContainer}>
        <KPIContainer type='connected'>
          <KPI data={KPIData?.['death_rate']} />
          <KPI data={KPIData?.['cases_per_million_population']} />
          <KPI data={KPIData?.['recovery_rate']} />
        </KPIContainer>
      </div>
      <div className={styles.graphContainer}>
        <KPIContainer type='connected' direction={'column'}>
          <KPI data={KPIData?.['name']} />
          <KPI data={KPIData?.['population']} />
          <KPI data={KPIData?.['updated_at']} />
        </KPIContainer>
      </div>
      <div className={styles.graphContainer}>
        {loading ? null : <CustomPieChart data={data} />}
      </div>
      <div className={styles.lineChart2}>
        {loading ? null : (
          <CustomMultiLineChart
            data={timeline}
            scale={'linear'}
            lines={timeLineProps2}
            yAxis='new_confirmed'
          />
        )}
      </div>
      <div className={styles.lineChart}>
        {loading ? null : (
          <CustomMultiLineChart
            data={timeline}
            scale={'log'}
            lines={timeLineProps}
            yAxis={'confirmed'}
          />
        )}
      </div>
    </div>
  );
};

const MemoizedMiddleSection = React.memo(MiddleSection);

export default MemoizedMiddleSection;
