import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import BottomSection from "./BottomSection/BottomSection";
import styles from "./Home.module.scss";
import MiddleSection from "./MiddleSection/MiddleSection";
import TopSection from "./TopSection/TopSection";

export type TabKeys = "KPI" | "Graphs";

const Home = () => {
  const [activeKey, setActiveKey] = useState<TabKeys>("KPI");

  return (
    <Layout>
      <div className={styles.container}>
        <TopSection />
        <MiddleSection activeKey={activeKey} />
        <BottomSection activeKey={activeKey} setActiveKey={setActiveKey} />
      </div>
    </Layout>
  );
};

export default Home;
