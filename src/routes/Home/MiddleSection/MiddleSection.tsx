import * as React from 'react';
import styles from './MiddleSection.module.scss';
import CustomPieChart from '../../../components/Charts/CustomPieChart/CustomPieChart';
import { KPIContainer, KPI } from '../../../components/KPI/KPI';
import formatNumber from '../../../utility/formatNumber';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../redux/reducers';
import { GraphState } from '../../../redux/reducers/graphData';
import CustomMultiLineChart from '../../../components/Charts/CustomMultiLineChart/CustomMultiLineChart';

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
            break;
          case 'latest_data':
            Object.keys(data[currentKey]).reduce((accu, keySecondLvl) => {
              switch (keySecondLvl) {
                case 'calculated':
                  Object.keys(data[currentKey][keySecondLvl]).reduce(
                    (accu, keyThirdLvl) => {
                      switch (keyThirdLvl) {
                        case 'cases_per_million_population':
                          accu[keyThirdLvl] = {
                            key: 'cases / Million',
                            value: formatNumber(
                              data[currentKey][keySecondLvl][keyThirdLvl]
                            ),
                          };
                          break;
                        case 'death_rate':
                          accu[keyThirdLvl] = {
                            key: 'death rate',
                            value: formatNumber(
                              data[currentKey][keySecondLvl][keyThirdLvl]
                            ),
                          };
                          break;
                        case 'recovery_rate':
                          accu[keyThirdLvl] = {
                            key: 'recovery rate',
                            value: formatNumber(
                              data[currentKey][keySecondLvl][keyThirdLvl]
                            ),
                          };
                          break;
                        default:
                          accu[keyThirdLvl] = {
                            key: keyThirdLvl,
                            value: formatNumber(
                              data[currentKey][keySecondLvl][keyThirdLvl]
                            ),
                          };
                          break;
                      }

                      return accu;
                    },
                    accu
                  );
                  break;
                default:
                  accu[keySecondLvl] = {
                    key: keySecondLvl,
                    value: formatNumber(data[currentKey][keySecondLvl]),
                  };
                  break;
              }

              return accu;
            }, accu);

            break;
        }

        return accu;
      }, {})
    : {};

  const timelineData =
    data &&
    data.timeline.map((item) => {
      item['dateNumber'] = Date.parse(item.updated_at);
      return item;
    });

  console.log(timelineData);

  return (
    <div className={styles.MiddleSection}>
      <div className={styles.graphContainer}>
        <KPIContainer type='separate'>
          <KPI data={KPIData['critical']} />
          <KPI data={KPIData['recovered']} />
          <KPI data={KPIData['deaths']} />
        </KPIContainer>
      </div>
      <div className={styles.graphContainer}>
        <KPIContainer type='connected'>
          <KPI data={KPIData['death_rate']} />
          <KPI data={KPIData['cases_per_million_population']} />
          <KPI data={KPIData['recovery_rate']} />
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
      <div className={styles.lineChart}>
        {loading ? null : <CustomMultiLineChart data={data.timeline} />}
      </div>
      <div className={styles.graphContainer}></div>
    </div>
  );
};

const MemoizedMiddleSection = React.memo(MiddleSection);

export default MemoizedMiddleSection;
