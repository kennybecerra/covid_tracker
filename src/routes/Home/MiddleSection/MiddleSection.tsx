import * as React from 'react';
import { Component } from 'react';
import styles from './MiddleSection.module.scss';

interface IProps {}

const MiddleSection: React.SFC<IProps> = (props) => {
  return <div className={styles.MiddleSection}></div>;
};

const MemoizedMiddleSection = React.memo(MiddleSection);

export default MemoizedMiddleSection;
