import * as React from 'react';
import { Component } from 'react';
import styles from './BottomSection.module.scss';

interface IProps {}

const BottomSection: React.SFC<IProps> = (props) => {
  return <div className={styles.BottomSection}></div>;
};

const MemoizedBottomSection = React.memo(BottomSection);

export default MemoizedBottomSection;
