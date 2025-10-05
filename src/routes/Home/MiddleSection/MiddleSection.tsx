import { Column, Line, Pie, type LineConfig } from "@ant-design/plots";
import {
  type ColumnConfig,
  type PieConfig,
} from "@ant-design/plots/es/interface";
import dayjs from "dayjs";
import * as React from "react";
import { animated, config, useSpring } from "react-spring";
import { KPI, KPIC, KPID } from "src/components/KPI/KPIs";
import Tile from "src/components/Tile";
import { type HistoricalCountryData } from "src/redux/features/historical";
import { useAppSelector } from "../../../redux/store";
import { type TabKeys } from "../Home";
import "./MiddleSection.scss";
interface MiddleSectionIProps {
  activeKey: TabKeys;
}

interface LinePoint {
  date: number;
  value: number;
  category: "cases" | "deaths" | "recovered";
}

const MultiLineTransformData: (data: HistoricalCountryData) => LinePoint[] = (
  data
) => {
  const dataMap: LinePoint[] = [];

  if (data?.timeline) {
    (["cases", "deaths", "recovered"] as const).forEach((key) => {
      Object.entries(data.timeline?.[key] ?? []).forEach((item) => {
        const [date, amount] = item as [string, number];

        const current = dayjs(date, "MM/DD/YY");
        if (current.isValid()) {
          dataMap.push({
            date: current.valueOf(),
            value: amount,
            category: key,
          });
        }
      });
    });

    return dataMap;
  }

  return [];
};

const MiddleSection: React.FC<MiddleSectionIProps> = ({ activeKey }) => {
  const { data } = useAppSelector((state) => state.country);
  const { data: historicalData, loading: historicalLoading } = useAppSelector(
    (state) => state.historical
  );

  const isLoading = !data;
  const isHistoricalLoading =
    historicalLoading === "pending" || !historicalData;

  // Staggered animations for each component
  const kpi1Animation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: 200,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const kpi2Animation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: 350,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const kpi3Animation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: 500,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const kpicAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: 650,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const kpidAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: 800,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const pieChartAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: 950,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const columnChartAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: 1100,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const lineChartAnimation = useSpring({
    from: { transform: "scale(0)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: 1250,
    config: { ...config.wobbly, tension: 150, friction: 12 },
  });

  const donutConfig: PieConfig = {
    autoFit: true,
    loading: isLoading,
    appendPadding: 10,
    data: [
      { type: "Deaths", value: data?.deathsPerOneMillion ?? 0 },
      { type: "Cases", value: data?.casesPerOneMillion ?? 0 },
      { type: "Recovered", value: data?.recoveredPerOneMillion ?? 0 },
    ],
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    innerRadius: 0.6,
    animation: false,
    color: ["#FF6B6B", "#5B8FF9", "#5AD8A6"],
    pieStyle: {
      stroke: "#1F1F1F",
      lineWidth: 2,
    },
    label: false,
    interactions: [
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: {
        style: {
          whiteSpace: "nowrap",
          overflow: "visible",
          fill: "#99aae7",
          fontSize: "14px",
          fontWeight: "bold",
        },
        formatter: () => "Per Million",
      },
      content: {
        style: {
          whiteSpace: "nowrap",
          overflow: "visible",
          fill: "#FFFFFF",
          fontSize: "16px",
          fontWeight: "bold",
        },
        formatter: (datum: any, data: any[]) => {
          const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
          if (total >= 1000000) {
            return `${(total / 1000000).toFixed(1)}M`;
          } else if (total >= 1000) {
            return `${(total / 1000).toFixed(0)}K`;
          }
          return total.toLocaleString();
        },
      },
    },
    tooltip: {
      showTitle: false,
      showMarkers: true,
      showContent: true,
      formatter: (datum: any) => {
        const value =
          typeof datum.value === "number" ? datum.value : parseInt(datum.value);
        let formattedValue = "";
        if (value >= 1000000) {
          formattedValue = `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          formattedValue = `${(value / 1000).toFixed(0)}K`;
        } else {
          formattedValue = value.toLocaleString();
        }
        return {
          name: `${datum.type} (Per Million)`,
          value: formattedValue,
        };
      },
      domStyles: {
        "g2-tooltip": {
          backgroundColor: "#1F1F1F",
          color: "#FFFFFF",
          borderRadius: "6px",
          border: "1px solid #434343",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    legend: {
      position: "bottom",
      itemName: {
        style: {
          fill: "#99aae7",
          fontSize: 12,
          fontWeight: "bold",
        },
        formatter: (text: string) => text,
      },
      marker: {
        symbol: "circle",
        style: {
          r: 4,
        },
      },
    },
    theme: {
      background: "transparent",
    },
  };

  const lineConfig: LineConfig = {
    autoFit: true,
    animation: {
      appear: {
        duration: 1000,
      },
      update: false,
    },
    loading: !historicalData,
    appendPadding: [16, 16, 16, 16],
    data: historicalData ? MultiLineTransformData(historicalData) : [],
    xField: "date",
    yField: "value",
    seriesField: "category",
    smooth: true,
    lineStyle: {
      lineWidth: 3,
    },
    point: {
      size: 3,
      shape: "circle",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    color: ["#5B8FF9", "#FF6B6B", "#5AD8A6"],
    xAxis: {
      type: "time",
      label: {
        formatter: (value: string) => {
          return dayjs(value, "YYYY-MM-DD").format("MM/DD/YYYY");
        },
        style: {
          fill: "#99aae7",
          fontSize: 11,
          fontWeight: "bold",
          letterSpacing: "0.5px",
        },
        autoRotate: true,
        autoHide: true,
      },
      line: {
        style: {
          stroke: "#434343",
        },
      },
      tickLine: {
        style: {
          stroke: "#434343",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#616161ff",
            lineWidth: 2,
            lineDash: [4, 5],
            strokeOpacity: 0.7,
          },
        },
      },
    },
    yAxis: {
      type: "log",
      base: 10,
      label: {
        formatter: (value: string) => {
          const num = parseFloat(value);
          if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
          } else if (num >= 1000) {
            return `${(num / 1000).toFixed(0)}K`;
          } else if (num >= 100) {
            return `${num.toFixed(0)}`;
          } else if (num >= 10) {
            return `${num.toFixed(0)}`;
          } else if (num >= 1) {
            return `${num.toFixed(0)}`;
          }
          return "0";
        },
        style: {
          fill: "#99aae7",
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      line: {
        style: {
          stroke: "#434343",
        },
      },
      tickLine: {
        style: {
          stroke: "#434343",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#616161ff",
            lineWidth: 2,
            lineDash: [4, 5],
            strokeOpacity: 0.7,
          },
        },
      },
    },
    legend: {
      position: "top-right",
      itemName: {
        style: {
          fill: "#FFFFFF",
          fontSize: 12,
        },
      },
      marker: {
        symbol: "circle",
        style: {
          r: 4,
        },
      },
    },
    tooltip: {
      showCrosshairs: true,
      shared: true,
      crosshairs: {
        type: "x",
        line: {
          style: {
            stroke: "#5B8FF9",
            lineWidth: 1,
            strokeOpacity: 0.8,
          },
        },
      },
      domStyles: {
        "g2-tooltip": {
          backgroundColor: "#1F1F1F",
          color: "#FFFFFF",
          borderRadius: "6px",
          border: "1px solid #434343",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        },
      },
      formatter: (datum: any) => {
        const value =
          typeof datum.value === "number" ? datum.value : parseInt(datum.value);
        return {
          name:
            datum.category.charAt(0).toUpperCase() + datum.category.slice(1),
          value: value.toLocaleString(),
        };
      },
    },
    theme: {
      background: "transparent",
    },
  };

  const ColumnConfig: ColumnConfig = {
    data: [
      { type: "Deaths", value: data?.deaths ?? 0 },
      { type: "Cases", value: data?.cases ?? 0 },
      { type: "Recovered", value: data?.recovered ?? 0 },
    ],
    xField: "type",
    yField: "value",
    autoFit: true,
    animation: {
      appear: {
        duration: 800,
      },
      update: false,
    },
    loading: isLoading,
    appendPadding: [16, 16, 16, 16],
    color: ["#FF6B6B", "#5B8FF9", "#5AD8A6"],
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    label: {
      position: "top",
      formatter: (val: { type: string; value: number }) => {
        const num =
          typeof val.value === "number" ? val.value : parseInt(val.value);
        if (num >= 1000000) {
          return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
          return `${(num / 1000).toFixed(0)}K`;
        }
        return num.toLocaleString();
      },
      style: {
        fill: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
      },
    },
    xAxis: {
      label: {
        style: {
          fill: "#99aae7",
          fontSize: 12,
          fontWeight: "bold",
        },
        autoHide: true,
        autoRotate: false,
      },
      line: {
        style: {
          stroke: "#434343",
        },
      },
      tickLine: {
        style: {
          stroke: "#434343",
        },
      },
    },
    yAxis: {
      label: {
        formatter: (value: string) => {
          const num = parseFloat(value);
          if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
          } else if (num >= 1000) {
            return `${(num / 1000).toFixed(0)}K`;
          }
          return num.toFixed(0);
        },
        style: {
          fill: "#99aae7",
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      line: {
        style: {
          stroke: "#434343",
        },
      },
      tickLine: {
        style: {
          stroke: "#434343",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#808080",
            lineWidth: 1,
            lineDash: [4, 5],
            strokeOpacity: 1,
          },
        },
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        const value =
          typeof datum.value === "number" ? datum.value : parseInt(datum.value);
        return {
          name: datum.type,
          value: value.toLocaleString(),
        };
      },
      domStyles: {
        "g2-tooltip": {
          backgroundColor: "#1F1F1F",
          color: "#FFFFFF",
          borderRadius: "6px",
          border: "1px solid #434343",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    theme: {
      background: "transparent",
    },
  };

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
        <Tile style={{ padding: 10 }} isLoading={isLoading}>
          <Pie {...donutConfig} />
        </Tile>
      </animated.div>
      <animated.div className={"column-chart"} style={columnChartAnimation}>
        <Tile style={{ padding: 10 }} isLoading={isLoading}>
          <Column {...ColumnConfig} />
        </Tile>
      </animated.div>
      <animated.div className={"line-chart"} style={lineChartAnimation}>
        <Tile style={{ padding: 10 }} isLoading={isHistoricalLoading}>
          <Line {...lineConfig} />
        </Tile>
      </animated.div>
    </div>
  );
};

export default MiddleSection;
