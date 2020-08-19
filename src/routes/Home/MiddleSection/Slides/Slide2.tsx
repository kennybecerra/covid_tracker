import * as React from 'react';
import styles from './Slide2.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountriesCovidData } from '../../../../redux/actions';
import { StoreState } from '../../../../redux/reducers';
import { GraphState } from '../../../../redux/reducers/graphData';
import Loading from '../../../../components/Loading/Loading';
import { ResponsiveGeoMapCanvas } from '@nivo/geo';
// import geo from '../../../../assets/json/110mGeo.json';

interface Slide2Props {}

const Slide2: React.FC<Slide2Props> = () => {
  const dispatch = useDispatch();
  const {
    countriesLoading,
    countriesError,
    countriesErrorMessage,
    countriesData,
    geoJSON,
  } = useSelector<StoreState, Partial<GraphState>>((state) => {
    return {
      ...state.graphData,
    };
  });

  const data = [
    {
      id: 'AFG',
      value: 534443,
    },
    {
      id: 'AGO',
      value: 547929,
    },
    {
      id: 'ALB',
      value: 486514,
    },
    {
      id: 'ARE',
      value: 832074,
    },
    {
      id: 'ARG',
      value: 79065,
    },
    {
      id: 'ARM',
      value: 578317,
    },
    {
      id: 'ATA',
      value: 567145,
    },
    {
      id: 'ATF',
      value: 70876,
    },
    {
      id: 'AUT',
      value: 577295,
    },
    {
      id: 'AZE',
      value: 932006,
    },
    {
      id: 'BDI',
      value: 554028,
    },
    {
      id: 'BEL',
      value: 632872,
    },
    {
      id: 'BEN',
      value: 794436,
    },
    {
      id: 'BFA',
      value: 887592,
    },
    {
      id: 'BGD',
      value: 960521,
    },
    {
      id: 'BGR',
      value: 666490,
    },
    {
      id: 'BHS',
      value: 542837,
    },
    {
      id: 'BIH',
      value: 392129,
    },
    {
      id: 'BLR',
      value: 249182,
    },
    {
      id: 'BLZ',
      value: 694212,
    },
    {
      id: 'BOL',
      value: 855809,
    },
    {
      id: 'BRN',
      value: 269695,
    },
    {
      id: 'BTN',
      value: 349372,
    },
    {
      id: 'BWA',
      value: 617941,
    },
    {
      id: 'CAF',
      value: 313064,
    },
    {
      id: 'CAN',
      value: 494510,
    },
    {
      id: 'CHE',
      value: 527364,
    },
    {
      id: 'CHL',
      value: 885856,
    },
    {
      id: 'CHN',
      value: 49606,
    },
    {
      id: 'CIV',
      value: 748804,
    },
    {
      id: 'CMR',
      value: 366901,
    },
    {
      id: 'COG',
      value: 291367,
    },
    {
      id: 'COL',
      value: 153931,
    },
    {
      id: 'CRI',
      value: 984881,
    },
    {
      id: 'CUB',
      value: 65105,
    },
    {
      id: '-99',
      value: 682028,
    },
    {
      id: 'CYP',
      value: 289011,
    },
    {
      id: 'CZE',
      value: 765102,
    },
    {
      id: 'DEU',
      value: 245504,
    },
  ];

  React.useEffect(() => {
    dispatch(fetchCountriesCovidData());
  }, []);

  return (
    <div className={styles.slide2}>
      <div className={styles.world}>
        {countriesLoading ? null : <Loading />}
      </div>
    </div>
  );
};

const MemoizedSlide2 = React.memo(Slide2);

export default MemoizedSlide2;
