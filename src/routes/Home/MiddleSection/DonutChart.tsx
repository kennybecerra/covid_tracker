import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DonutDataPoint {
  type: string;
  value: number;
  [key: string]: any;
}

// Custom tooltip component for Donut Chart
const CustomDonutTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const value = data.value;
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
          <span style={{ color: data.payload.fill }}>
            {data.payload.type} (Per Million):
          </span>{" "}
          {formattedValue}
        </p>
      </div>
    );
  }
  return null;
};

// Custom center text component
const CenterText = ({ data }: { data: DonutDataPoint[] }) => {
  const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
  let formattedTotal = "";

  if (total >= 1000000) {
    formattedTotal = `${(total / 1000000).toFixed(1)}M`;
  } else if (total >= 1000) {
    formattedTotal = `${(total / 1000).toFixed(0)}K`;
  } else {
    formattedTotal = total.toLocaleString();
  }

  // Use font sizes that scale with the chart
  // These are calculated as a percentage of the typical chart height (245px)
  const titleFontSize = "1em"; // Scales with container
  const valueFontSize = "1.25em"; // Scales with container

  return (
    <g>
      <text
        x="50%"
        y="40%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={valueFontSize}
        fontWeight="bold"
        fill="#FFFFFF"
      >
        {formattedTotal}
      </text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={titleFontSize}
        fontWeight="bold"
        fill="#99aae7"
      >
        Per Million
      </text>
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

export const DonutChart = ({ data }: { data: DonutDataPoint[] }) => {
  // Check if data is valid
  const isValidData =
    data && data.length > 0 && data.some(item => item.value > 0);

  if (!isValidData) {
    return <NoDataFallback />;
  }

  // Define colors for each type
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

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{ border: "1px solid #434343" }}
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={false}
          outerRadius={90}
          innerRadius={55}
          fill="#8884d8"
          dataKey="value"
          stroke="#1F1F1F"
          strokeWidth={2}
          style={{ border: "1px solid red" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.type)} />
          ))}
        </Pie>
        <Tooltip content={<CustomDonutTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{
            color: "#99aae7",
            fontSize: "12px",
            fontWeight: "bold",
            paddingTop: "10px",
          }}
          iconType="circle"
          formatter={(value, entry: any) => {
            // Find the corresponding data item to get the proper type name
            const dataItem = data.find(
              item => getColor(item.type) === entry.color
            );
            return dataItem ? dataItem.type : value;
          }}
        />
        {/* Using CenterText component with responsive font sizes */}
        <CenterText data={data} />
      </PieChart>
    </ResponsiveContainer>
  );
};
