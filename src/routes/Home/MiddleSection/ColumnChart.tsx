import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ColumnDataPoint {
  type: string;
  value: number;
}

// Define colors for each bar type
const getColor = (type: string) => {
  switch (type) {
    case "Deaths":
      return "#FF6B6B";
    case "Cases":
      return "#5B8FF9";
    case "Recovered":
      return "#5AD8A6";
    default:
      return "#5B8FF9";
  }
};

// Custom tooltip component for Column Chart
const CustomColumnTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const value = data.value;
    const type = data.payload.type;
    let formattedValue = "";

    if (value >= 1000000) {
      formattedValue = `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      formattedValue = `${(value / 1000).toFixed(0)}K`;
    } else {
      formattedValue = value.toLocaleString();
    }

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
        <p style={{ margin: "0", fontWeight: "bold" }}>
          <span style={{ color: getColor(type) }}>{type}:</span>{" "}
          {formattedValue}
        </p>
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
  }
  return value.toFixed(0);
};

// Custom label component for top of bars
const CustomLabel = (props: any) => {
  const { x, y, width, value } = props;
  let formattedValue = "";

  if (value >= 1000000) {
    formattedValue = `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    formattedValue = `${(value / 1000).toFixed(0)}K`;
  } else {
    formattedValue = value.toLocaleString();
  }

  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="#FFFFFF"
      textAnchor="middle"
      dy={-6}
      fontSize="12"
      fontWeight="bold"
    >
      {formattedValue}
    </text>
  );
};

// Get hover color (lighter and more transparent version)
const getHoverColor = (type: string) => {
  switch (type) {
    case "Deaths":
      return "rgba(255, 107, 107, 0.8)"; // Lighter, more transparent red
    case "Cases":
      return "rgba(91, 143, 249, 0.8)"; // Lighter, more transparent blue
    case "Recovered":
      return "rgba(90, 216, 166, 0.8)"; // Lighter, more transparent green
    default:
      return "rgba(91, 143, 249, 0.8)";
  }
};

// Custom Bar Shape for rounded corners with hover effects
const RoundedBar = (props: any) => {
  const { fill, x, y, width, height, payload } = props;
  const radius = 4;
  const [isHovered, setIsHovered] = React.useState(false);

  const hoverColor = payload ? getHoverColor(payload.type) : fill;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isHovered ? hoverColor : fill}
        rx={radius}
        ry={radius}
        style={{
          cursor: "pointer",
          transition: "fill 0.2s ease-in-out",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </g>
  );
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
        📊
      </div>
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
        No Data Available
      </div>
      <div style={{ fontSize: "12px", opacity: 0.8 }}>
        Chart data is currently unavailable
      </div>
    </div>
  );
};

export const ColumnChart = ({ data }: { data: ColumnDataPoint[] }) => {
  // Check if data is valid
  const isValidData =
    data && data.length > 0 && data.some((item) => item.value > 0);

  if (!isValidData) {
    return <NoDataFallback />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid
          strokeDasharray="4 5"
          stroke="#808080"
          strokeOpacity={1}
          strokeWidth={1}
        />
        <XAxis
          dataKey="type"
          tick={{ fill: "#99aae7", fontSize: 12, fontWeight: "bold" }}
          axisLine={{ stroke: "#434343" }}
          tickLine={{ stroke: "#434343" }}
        />
        <YAxis
          tick={{ fill: "#99aae7", fontSize: 12, fontWeight: "bold" }}
          axisLine={{ stroke: "#434343" }}
          tickLine={{ stroke: "#434343" }}
          tickFormatter={formatYAxisLabel}
        />
        <Tooltip
          content={<CustomColumnTooltip />}
          cursor={{
            fill: "rgba(42, 69, 177, 0.1)", // Very subtle blue background matching our theme
            stroke: "rgba(42, 69, 177, 0.3)", // Slightly more visible border
            strokeWidth: 1,
            strokeDasharray: "3 3", // Subtle dashed border
          }}
        />
        <Bar dataKey="value" shape={<RoundedBar />}>
          <LabelList content={<CustomLabel />} />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.type)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
