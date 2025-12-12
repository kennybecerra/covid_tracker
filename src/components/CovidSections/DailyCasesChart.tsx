import { ParentSize } from "@visx/responsive";
import type { DataPoint } from "../Charts";
import { MultiLineChart } from "../Charts";
import styles from "./DailyCasesChart.module.scss";

interface DailyCasesChartProps {
	data: DataPoint[];
	deathsData?: DataPoint[];
	animate?: boolean;
}

const DailyCasesChart = ({
	data,
	deathsData,
	animate = true,
}: DailyCasesChartProps) => {
	return (
		<section className={styles.dailyCases}>
			<h2 className={styles.title}>Daily New Cases & Deaths (Last 30 Days)</h2>
			<div className={styles.chartContainer}>
				<ParentSize>
					{({ width, height }) => (
						<MultiLineChart
							data={data}
							secondData={deathsData}
							showSecondLine={!!deathsData}
							width={width}
							height={height - 50}
							margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
							colors={{
								line1: "#407db6",
								line2: "#dc2626",
							}}
							legends={[
								{ label: "Total Cases", color: "#407db6" },
								{ label: "Total Deaths", color: "#dc2626" },
							]}
							animate={animate}
							useLogScale={true}
						/>
					)}
				</ParentSize>
			</div>
		</section>
	);
};

export default DailyCasesChart;
