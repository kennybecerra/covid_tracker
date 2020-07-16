import * as React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import BackgroundTop from './TopSection/Backgrounds/BackgroundTop';
import TopSection from './TopSection/TopSection';
import MiddleSection from './MiddleSection/MiddleSection';
import BottomSection from './BottomSection/BottomSection';
import styles from './Home.module.scss';
import CountryCodes from '../../utility/countryCodes.json';

interface IProps {}

const Home: React.SFC<IProps> = () => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // console.log(searchField);

    const results = await fetch(
      `https://corona-api.com/countries`
    ).then((res) => res.json());
    console.log(results);
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    try {
      const results = await fetch(
        `https://corona-api.com/countries/${e.currentTarget.value}`
      ).then((res) => res.json());

      console.log(results);
    } catch (err) {
      console.log('Error happened');
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <TopSection handleChange={handleChange} handleSubmit={handleSubmit} />
        <MiddleSection />
        <BottomSection />
      </div>
    </Layout>
  );
};

export default Home;
