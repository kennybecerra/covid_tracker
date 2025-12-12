import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveLinear } from "@visx/curve";
import { GridColumns, GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleLinear, scaleLog } from "@visx/scale";
import { LinePath } from "@visx/shape";
import numeral from "numeral";
import { useEffect, useId, useMemo, useState } from "react";
import { animated, useSpring } from "react-spring";
import styles from "./MultiLineChart.module.scss";

export interface DataPoint {
	date: string;
	value: number;
}

export interface Legend {
	label: string;
	color: string;
}

export interface MultiLineChartProps {
	data: DataPoint[];
	width?: number;
	height?: number;
	margin?: { top: number; right: number; bottom: number; left: number };
	colors?: {
		line1: string;
		line2?: string;
	};
	showSecondLine?: boolean;
	secondData?: DataPoint[];
	legends?: Legend[];
	animate?: boolean;
	animationDuration?: number;
	useLogScale?: boolean;
}

const defaultMargin = { top: 20, right: 20, bottom: 40, left: 50 };

const MultiLineChart: React.FC<MultiLineChartProps> = ({
	data,
	width = 600,
	height = 300,
	margin = defaultMargin,
	colors = {
		line1: "#4285f4",
		line2: "#34a853",
	},
	showSecondLine = false,
	secondData = [],
	legends = [],
	animate = true,
	animationDuration = 1500,
	useLogScale = false,
}) => {
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const [hasAnimated, setHasAnimated] = useState(false);
	const pathId1 = useId();
	const pathId2 = useId();
	const [tooltipData, setTooltipData] = useState<{
		x: number;
		y: number;
		date: string;
		value1: number;
		value2?: number;
	} | null>(null);

	const springProps = useSpring({
		opacity: animate && !hasAnimated ? 0 : 1,
		transform: animate && !hasAnimated ? "translateY(20px)" : "translateY(0px)",
		config: { duration: animationDuration / 3 },
	});

	const lineAnimation = useSpring({
		strokeDashoffset: animate && !hasAnimated ? 1 : 0,
		config: { duration: animationDuration },
	});

	useEffect(() => {
		if (animate && !hasAnimated) {
			setHasAnimated(true);
		}
	}, [animate, hasAnimated]);

	const { xScale, yScale } = useMemo(() => {
		const allData = showSecondLine ? [...data, ...secondData] : data;
		const maxValue = Math.max(...allData.map((d) => d.value));
		const minValue = Math.min(...allData.map((d) => d.value));

		const xScale = scaleLinear({
			domain: [0, data.length - 1],
			range: [0, innerWidth],
		});

		const yScale = useLogScale
			? scaleLog({
					domain: [Math.max(1, minValue), maxValue],
					range: [innerHeight, 0],
					nice: true,
				})
			: scaleLinear({
					domain: [Math.max(0, minValue * 0.9), maxValue * 1.1],
					range: [innerHeight, 0],
					nice: true,
				});

		return { xScale, yScale };
	}, [data, secondData, showSecondLine, innerWidth, innerHeight, useLogScale]);

	const getX = (_d: DataPoint, i: number) => xScale(i) ?? 0;
	const getY = (d: DataPoint) => yScale(d.value) ?? 0;

	return (
		<animated.div className={styles.chartContainer} style={springProps}>
			<svg
				width={width}
				height={height}
				role="img"
				aria-label="Multi-line chart"
			>
				<Group left={margin.left} top={margin.top}>
					<GridRows
						scale={yScale}
						width={innerWidth}
						stroke="rgba(153, 170, 231, 0.2)"
						strokeWidth={1}
					/>
					<GridColumns
						scale={xScale}
						height={innerHeight}
						stroke="rgba(153, 170, 231, 0.2)"
						strokeWidth={1}
						numTicks={6}
					/>{" "}
					{/* First line with animation */}
					<defs>
						<clipPath id={pathId1}>
							<animated.rect
								x={0}
								y={0}
								width={lineAnimation.strokeDashoffset.to(
									(offset) => innerWidth * (1 - offset),
								)}
								height={innerHeight}
							/>
						</clipPath>
						{showSecondLine && (
							<clipPath id={pathId2}>
								<animated.rect
									x={0}
									y={0}
									width={lineAnimation.strokeDashoffset.to(
										(offset) => innerWidth * (1 - offset),
									)}
									height={innerHeight}
								/>
							</clipPath>
						)}
					</defs>
					<LinePath
						data={data}
						x={(d, i) => getX(d, i)}
						y={(d) => getY(d)}
						stroke={colors.line1}
						strokeWidth={3}
						fill="none"
						vectorEffect="non-scaling-stroke"
						curve={curveLinear}
						clipPath={animate ? `url(#${pathId1})` : undefined}
					/>
					{/* Second line with animation */}
					{showSecondLine && secondData.length > 0 && (
						<LinePath
							data={secondData}
							x={(d, i) => getX(d, i)}
							y={(d) => getY(d)}
							stroke={colors.line2}
							strokeWidth={3}
							fill="none"
							vectorEffect="non-scaling-stroke"
							curve={curveLinear}
							clipPath={animate ? `url(#${pathId2})` : undefined}
						/>
					)}
					{/* Axes */}
					<AxisLeft
						scale={yScale}
						numTicks={4}
						stroke="rgba(153, 170, 231, 0.3)"
						strokeWidth={2}
						tickStroke="rgba(153, 170, 231, 0.3)"
						tickLength={8}
						tickFormat={(value) => numeral(value).format("0.0a").toUpperCase()}
						tickLabelProps={() => ({
							fill: "#99aae7",
							fontSize: 11,
							textAnchor: "end",
							dx: "-0.5em",
							dy: "0.33em",
						})}
					/>
					<AxisBottom
						top={innerHeight}
						scale={xScale}
						stroke="rgba(153, 170, 231, 0.3)"
						strokeWidth={2}
						tickStroke="rgba(153, 170, 231, 0.3)"
						tickLength={8}
						numTicks={6}
						tickFormat={(value) => {
							const index = Math.floor(Number(value));
							return data[index]?.date || "";
						}}
						tickLabelProps={() => ({
							fill: "#99aae7",
							fontSize: 11,
							textAnchor: "end",
							angle: -30,
							dx: "-0.25em",
							dy: "0.25em",
						})}
					/>
					{/* Interactive data points for tooltip */}
					{data.map((d, i) => {
						const x = getX(d, i);
						const y1 = getY(d);
						const y2 =
							showSecondLine && secondData[i] ? getY(secondData[i]) : undefined;

						return (
							<g key={`tooltip-trigger-${i}`}>
								{/* First line data point */}
								<circle
									cx={x}
									cy={y1}
									r={5}
									fill={colors.line1}
									stroke="white"
									strokeWidth={2}
									opacity={0}
									className={styles.dataPoint}
									onMouseEnter={(e) => {
										const rect =
											e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
										setTooltipData({
											x: e.clientX - (rect?.left || 0),
											y: e.clientY - (rect?.top || 0),
											date: d.date,
											value1: d.value,
											value2: secondData[i]?.value,
										});
									}}
									onMouseMove={(e) => {
										if (tooltipData) {
											const rect =
												e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
											setTooltipData({
												...tooltipData,
												x: e.clientX - (rect?.left || 0),
												y: e.clientY - (rect?.top || 0),
											});
										}
									}}
									onMouseLeave={() => setTooltipData(null)}
									style={{ cursor: "pointer" }}
								/>
								{/* Second line data point */}
								{showSecondLine && y2 !== undefined && (
									<circle
										cx={x}
										cy={y2}
										r={5}
										fill={colors.line2}
										stroke="white"
										strokeWidth={2}
										opacity={0}
										className={styles.dataPoint}
										onMouseEnter={(e) => {
											const rect =
												e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
											setTooltipData({
												x: e.clientX - (rect?.left || 0),
												y: e.clientY - (rect?.top || 0),
												date: d.date,
												value1: d.value,
												value2: secondData[i]?.value,
											});
										}}
										onMouseMove={(e) => {
											if (tooltipData) {
												const rect =
													e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
												setTooltipData({
													...tooltipData,
													x: e.clientX - (rect?.left || 0),
													y: e.clientY - (rect?.top || 0),
												});
											}
										}}
										onMouseLeave={() => setTooltipData(null)}
										style={{ cursor: "pointer" }}
									/>
								)}
							</g>
						);
					})}
				</Group>
			</svg>

			{/* Legend */}
			{legends.length > 0 && (
				<div className={styles.legend}>
					{legends.map((legend, i) => (
						<div key={i} className={styles.legendItem}>
							<div
								className={styles.legendColor}
								style={{ backgroundColor: legend.color }}
							/>
							<span className={styles.legendLabel}>{legend.label}</span>
						</div>
					))}
				</div>
			)}

			{/* Tooltip */}
			{tooltipData && (
				<div
					className={styles.tooltip}
					style={{
						left: tooltipData.x + 10,
						top: tooltipData.y + 10,
					}}
				>
					<div className={styles.tooltipDate}>{tooltipData.date}</div>
					{legends.length > 0 ? (
						<>
							<div className={styles.tooltipRow}>
								<span style={{ color: legends[0]?.color || colors.line1 }}>
									{legends[0]?.label || "Value 1"}:
								</span>{" "}
								{numeral(tooltipData.value1).format("0,0")}
							</div>
							{tooltipData.value2 !== undefined && legends[1] && (
								<div className={styles.tooltipRow}>
									<span style={{ color: legends[1].color || colors.line2 }}>
										{legends[1].label || "Value 2"}:
									</span>{" "}
									{numeral(tooltipData.value2).format("0,0")}
								</div>
							)}
						</>
					) : (
						<div className={styles.tooltipRow}>
							{numeral(tooltipData.value1).format("0,0")}
						</div>
					)}
				</div>
			)}
		</animated.div>
	);
};

export default MultiLineChart;
