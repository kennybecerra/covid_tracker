import * as React from 'react';
import { useMemo, useState } from 'react';
import styles from './TopSection.module.scss';
import BackgroundTop from './Backgrounds/BackgroundTop';
import CountryCodes from '../../../utility/countryCodes.json';
import { useDispatch } from 'react-redux';
import { fetchCovidData } from '../../../redux/actions';
import Select from 'react-select';

interface TopSectionIProps {}

const TopSection: React.FC<TopSectionIProps> = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({
    label: 'United States',
    value: 'US',
  });

  const handleChange: (prop: { label: string; value: string }) => void = (
    prop
  ) => {
    setSelected(prop);
    dispatch(fetchCovidData(prop.value));
  };

  const options = useMemo(() => {
    return Object.entries(CountryCodes).map(([key, value]) => ({
      label: key,
      value,
    }));
  }, []);

  return (
    <form action='' className={styles.search}>
      <BackgroundTop />
      <span className={styles.location}></span>
      <div className={styles.inputContainer}>
        <Select
          options={options}
          value={selected}
          onChange={handleChange}
          className={styles.select}
          isSearchable
        />
      </div>
      <span className={styles.date}></span>
    </form>
  );
};

const MemoizedTopSection = React.memo(TopSection);

export default MemoizedTopSection;
