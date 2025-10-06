import dayjs from "dayjs";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RechartsDataPoint {
  date: string;
  timestamp: number;
  cases: number;
  deaths: number;
  recovered: number;
}

// Custom tooltip component for Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#1F1F1F",
          color: "#FFFFFF",
          borderRadius: "6px",
          border: "1px solid #434343",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
          padding: "12px",
          fontSize: "12px",
        }}
      >
        <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ margin: "4px 0", color: entry.color }}>
            <span style={{ fontWeight: "bold" }}>
              {entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}:
            </span>{" "}
            {typeof entry.value === "number"
              ? entry.value.toLocaleString()
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Y-axis formatter function
const formatYAxisLabel = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  } else if (value >= 100) {
    return `${value.toFixed(0)}`;
  } else if (value >= 10) {
    return `${value.toFixed(0)}`;
  } else if (value >= 1) {
    return `${value.toFixed(0)}`;
  }
  return "0";
};

// No data fallback component
const NoDataFallback = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "#99aae7",
        fontSize: "14px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          marginBottom: "12px",
          opacity: 0.6,
        }}
      >
        📈
      </div>
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
        No Historical Data
      </div>
      <div style={{ fontSize: "12px", opacity: 0.8 }}>
        Historical chart data is currently unavailable
      </div>
    </div>
  );
};

export const Multilinechart = ({ data }: { data: RechartsDataPoint[] }) => {
  // Check if data is valid
  const isValidData =
    data &&
    data.length > 0 &&
    data.some(
      (item) => item.cases > 0 || item.deaths > 0 || item.recovered > 0,
    );

  if (!isValidData) {
    return <NoDataFallback />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 30, right: 30, left: 5, bottom: 10 }}
      >
        <CartesianGrid
          strokeDasharray="4 5"
          stroke="#616161ff"
          strokeOpacity={0.7}
          strokeWidth={2}
        />
        <XAxis
          dataKey="date"
          tick={{ fill: "#99aae7", fontSize: 11, fontWeight: "bold" }}
          axisLine={{ stroke: "#434343" }}
          tickLine={{ stroke: "#434343" }}
          tickFormatter={(value) => {
            return dayjs(value, "MM/DD/YYYY").format("MM/DD/YYYY");
          }}
        />
        <YAxis
          scale="auto"
          domain={[0, "dataMax"]}
          tick={{ fill: "#99aae7", fontSize: 12, fontWeight: "bold" }}
          axisLine={{ stroke: "#434343" }}
          tickLine={{ stroke: "#434343" }}
          tickFormatter={formatYAxisLabel}
          allowDataOverflow={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            color: "#FFFFFF",
            fontSize: "12px",
          }}
          iconType="circle"
        />
        <Line
          type="monotone"
          dataKey="cases"
          stroke="#5B8FF9"
          strokeWidth={3}
          dot={{
            fill: "white",
            stroke: "#5B8FF9",
            strokeWidth: 0.5,
            r: 1,
          }}
          name="Cases"
        />
        <Line
          type="monotone"
          dataKey="deaths"
          stroke="#FF6B6B"
          strokeWidth={3}
          dot={{
            fill: "white",
            stroke: "#FF6B6B",
            strokeWidth: 0.5,
            r: 1,
          }}
          name="Deaths"
        />
        <Line
          type="monotone"
          dataKey="recovered"
          stroke="#5AD8A6"
          strokeWidth={3}
          dot={{
            fill: "white",
            stroke: "#5AD8A6",
            strokeWidth: 0.5,
            r: 1,
          }}
          name="Recovered"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
