import * as React from 'react';
import styles from './TopSection.module.scss';
import BackgroundTop from './Backgrounds/BackgroundTop';
import CountryCodes from '../../../utility/countryCodes.json';

interface TopSectionIProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>;
}

const TopSection: React.SFC<TopSectionIProps> = ({
  handleSubmit,
  handleChange,
}) => {
  return (
    <form action='' className={styles.search} onSubmit={handleSubmit}>
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
