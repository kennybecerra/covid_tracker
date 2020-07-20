import * as React from 'react';
import styles from './Layout.module.scss';

interface IProps {}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>{children}</div>
      <div className={styles.block1}></div>
      <div className={styles.block2}></div>
    </div>
  );
};

const MemoizedLayout = React.memo(Layout);

export default MemoizedLayout;
