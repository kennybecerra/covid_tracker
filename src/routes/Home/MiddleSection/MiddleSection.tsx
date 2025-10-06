import dayjs from "dayjs";
import * as React from "react";
import { animated, config, useSpring } from "react-spring";
import { KPI, KPIC, KPID } from "src/components/KPI/KPIs";
import Tile from "src/components/Tile";
import { type HistoricalCountryData } from "src/redux/features/historical";
import { useAppSelector } from "../../../redux/store";
import { type TabKeys } from "../Home";
import { ColumnChart } from "./ColumnChart";
import { DonutChart } from "./DonutChart";
import "./MiddleSection.scss";
import { Multilinechart } from "./MultiLineChart";
interface MiddleSectionIProps {
  activeKey: TabKeys;
}

interface RechartsDataPoint {
  date: string;
  timestamp: number;
  cases: number;
  deaths: number;
  recovered: number;
}

const MultiLineTransformData: (
  data: HistoricalCountryData
) => RechartsDataPoint[] = data => {
  const dataMap: { [key: string]: RechartsDataPoint } = {};

  if (data?.timeline) {
    // Get all unique dates first
    const allDates = new Set<string>();
    (["cases", "deaths", "recovered"] as const).forEach(key => {
      Object.keys(data.timeline?.[key] ?? {}).forEach(date =>
        allDates.add(date)
      );
    });

    // Create data points for each date
    Array.from(allDates).forEach(date => {
      const current = dayjs(date, "MM/DD/YY");
      if (current.isValid()) {
        const dateStr = current.format("MM/DD/YYYY");
        dataMap[dateStr] = {
          date: dateStr,
          timestamp: current.valueOf(),
          cases: data.timeline?.cases?.[date] ?? 0,
          deaths: data.timeline?.deaths?.[date] ?? 0,
          recovered: data.timeline?.recovered?.[date] ?? 0,
        };
      }
    });

    // Convert to array and sort by timestamp
    return Object.values(dataMap).sort((a, b) => a.timestamp - b.timestamp);
  }

  return [];
};

const MiddleSection: React.FC<MiddleSectionIProps> = ({ activeKey }) => {
  const { data } = useAppSelector(state => state.country);
  const { data: historicalData, loading: historicalLoading } = useAppSelector(
    state => state.historical
  );

  const baseDelay = 1500;

  const isLoading = !data;
  const isHistoricalLoading =
    historicalLoading === "pending" || !historicalData;

  // Staggered animations for each component
  const kpi1Animation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: baseDelay + 200,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const kpi2Animation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: baseDelay + 350,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const kpi3Animation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: baseDelay + 500,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const kpicAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: baseDelay + 650,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const kpidAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: baseDelay + 800,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const pieChartAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: baseDelay + 950,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const columnChartAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: baseDelay + 1100,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const lineChartAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: baseDelay + 1250,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  // Helper function to validate and sanitize data
  const validateNumber = (value: any): number => {
    const num = Number(value);
    return isNaN(num) || num < 0 ? 0 : num;
  };

  const donutChartData = [
    { type: "Deaths", value: validateNumber(data?.deathsPerOneMillion) },
    { type: "Cases", value: validateNumber(data?.casesPerOneMillion) },
    { type: "Recovered", value: validateNumber(data?.recoveredPerOneMillion) },
  ];

  const lineChartData = historicalData
    ? MultiLineTransformData(historicalData)
    : [];

  const columnChartData = [
    { type: "Deaths", value: validateNumber(data?.deaths) },
    { type: "Cases", value: validateNumber(data?.cases) },
    { type: "Recovered", value: validateNumber(data?.recovered) },
  ];

  // Check if we have any meaningful data for each chart
  const hasDonutData = donutChartData.some(item => item.value > 0);
  const hasColumnData = columnChartData.some(item => item.value > 0);
  const hasLineData =
    lineChartData.length > 0 &&
    lineChartData.some(
      item => item.cases > 0 || item.deaths > 0 || item.recovered > 0
    );

  return (
    <div className="grid">
      <animated.div style={kpi1Animation}>
        <KPI
          title="critical"
          amount={data?.critical ?? 0}
          isLoading={isLoading}
        />
      </animated.div>
      <animated.div style={kpi2Animation}>
        <KPI
          title="recovered"
          amount={data?.recovered ?? 0}
          isLoading={isLoading}
        />
      </animated.div>
      <animated.div style={kpi3Animation}>
        <KPI title="deaths" amount={data?.deaths ?? 0} isLoading={isLoading} />
      </animated.div>
      <animated.div className={"KPIC_container"} style={kpicAnimation}>
        <KPIC
          items={[
            {
              isLoading,
              title: "Critical/Mill",
              amount: data?.criticalPerOneMillion ?? 0,
            },
            {
              isLoading,
              title: "Recovered/Mill",
              amount: data?.recoveredPerOneMillion ?? 0,
            },
            {
              isLoading,
              title: "Deaths/Mill",
              amount: data?.deathsPerOneMillion ?? 0,
            },
          ]}
        />
      </animated.div>
      <animated.div className={"KPID_container"} style={kpidAnimation}>
        <KPID
          items={[
            {
              isLoading,
              title: "Country",
              value: data?.country ?? "",
            },
            {
              isLoading,
              title: "Population",
              value: data?.population ?? 0,
            },
            {
              isLoading,
              title: "Last Update",
              value: dayjs(data?.updated ?? 0).format("MM/DD/YYYY"),
            },
          ]}
        />
      </animated.div>
      <animated.div className={"pie-chart"} style={pieChartAnimation}>
        <Tile style={{}} isLoading={isLoading}>
          <DonutChart data={donutChartData} />
        </Tile>
      </animated.div>
      <animated.div className={"column-chart"} style={columnChartAnimation}>
        <Tile isLoading={isLoading}>
          <ColumnChart data={columnChartData} />
        </Tile>
      </animated.div>
      <animated.div className={"line-chart"} style={lineChartAnimation}>
        <Tile isLoading={isHistoricalLoading}>
          <Multilinechart data={lineChartData} />
        </Tile>
      </animated.div>
    </div>
  );
};

export default MiddleSection;
