import * as React from 'react';
import styles from './TopSection.module.scss';
import BackgroundTop from './Backgrounds/BackgroundTop';
import CountryCodes from '../../../utility/countryCodes.json';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../redux/actions';

interface TopSectionIProps {}

const TopSection: React.FC<TopSectionIProps> = () => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(fetchData(e.currentTarget.value));
  };

  return (
    <form action='' className={styles.search}>
      <BackgroundTop />
      <span className={styles.location}></span>
      <div className={styles.inputContainer}>
        <select defaultValue={'US'} onChange={handleChange}>
          {Object.keys(CountryCodes).map((country) => {
            return (
              <option key={country} value={CountryCodes[country]}>
                {country}
              </option>
            );
          })}
        </select>

        <button className={styles.button}>submit</button>
      </div>
      <span className={styles.date}></span>
    </form>
  );
};

const MemoizedTopSection = React.memo(TopSection);

export default MemoizedTopSection;
