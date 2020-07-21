import * as React from 'react';
import styles from './KPI.module.scss';

interface KPIIProps {
  data?: {
    key: string;
    value: string;
  };
}

const KPI: React.FC<KPIIProps> = ({ data }) => {
  const { key, value } = data ? data : { key: 'Loading', value: 'Loading' };

  return (
    <div className={styles.KPI}>
      <span className={styles.value}>{value}</span>
      <span className={styles.key}>{key}</span>
    </div>
  );
};

const memoizedKPI = React.memo(KPI);

interface KPIContainerIProps {
  type?: 'separate' | 'connected';
  direction?: 'row' | 'column';
  children:
    | React.ReactElement<KPIIProps>
    | Array<React.ReactElement<KPIIProps>>;
}

const KPIContainer: React.FC<KPIContainerIProps> = (props) => {
  const { children, type, direction } = props;
  return (
    <div
      className={`${styles.KPIContainer} ${
        type ? styles[type] : styles.separate
      } ${direction ? styles[direction] : styles.row}`}>
      {children}
    </div>
  );
};

const memoizedKPIContainer = React.memo(KPIContainer);

export { memoizedKPI as KPI, memoizedKPIContainer as KPIContainer };
