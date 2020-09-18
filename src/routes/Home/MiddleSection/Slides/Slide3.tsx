import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../redux/reducers';
import { GraphState } from '../../../../redux/reducers/graphData';
import VTable from '../../../../components/Table/VirtualizedTable';
import formatNumber from '../../../../utility/formatNumber';
import styles from './Slide3.module.scss';

export interface Slide3IProps {}

const Slide3: React.SFC<Slide3IProps> = () => {
  const dispatch = useDispatch();
  const {
    countriesLoading,
    countriesError,
    countriesErrorMessage,
    countriesData,
    globalTimelineData,
  } = useSelector<StoreState, Partial<GraphState>>((state) => {
    return {
      ...state.graphData,
    };
  });

  return (
    <div className={styles.slide3}>
      <VTable
        data={countriesData}
        rowHeight={50}
        rowKey={'name'}
        minCellWidth={80}
        thresholdRows={2}
        sorter={(key, forward, first, second) => {
          let flag;
          switch (key) {
            case 'population':
            case 'deaths':
            case 'confirmed':
            case 'recovered':
            case 'critical':
              flag = forward ? first > second : second > first;

              return first === second ? 0 : flag ? 1 : -1;
              break;
            case 'name':
              let a = first.toUpperCase().charCodeAt(0);
              let b = second.toUpperCase().charCodeAt(0);
              flag = forward ? a > b : b > a;
              return a === b ? 0 : flag ? 1 : -1;
              return 0;
              break;
            case 'updated_at':
              return 0;
              break;
          }
        }}
        columns={[
          { title: 'Name', key: 'name' },
          { title: 'Population', key: 'population', transform: formatNumber },
          { title: 'Deaths', key: 'deaths', transform: formatNumber },
          { title: 'Confirmed', key: 'confirmed', transform: formatNumber },
          { title: 'Recovered', key: 'recovered', transform: formatNumber },
          { title: 'Critical', key: 'critical', transform: formatNumber },
          {
            title: 'Last Update',
            key: 'updated_at',
            transform: (date) => {
              return new Date(date).toLocaleString();
            },
          },
        ]}
      />
    </div>
  );
};

export default Slide3;
