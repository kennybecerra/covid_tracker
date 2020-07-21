import * as React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import TopSection from './TopSection/TopSection';
import MiddleSection from './MiddleSection/MiddleSection';
import BottomSection from './BottomSection/BottomSection';
import styles from './Home.module.scss';

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <TopSection />
        <MiddleSection />
        <BottomSection />
      </div>
    </Layout>
  );
};

export default Home;
