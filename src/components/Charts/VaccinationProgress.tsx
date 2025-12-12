import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { defaultStyles, TooltipWithBounds, useTooltip } from "@visx/tooltip";
import numeral from "numeral";
import { useEffect, useId, useRef, useState } from "react";
import { animated, useSpring, useSprings } from "react-spring";
import styles from "./VaccinationProgress.module.scss";

export interface RecoveryTestingData {
	label: string;
	recovered: number;
	tests: number;
}

export interface VaccinationProgressProps {
	percentage: number;
	data: RecoveryTestingData[];
	width?: number;
	height?: number;
	margin?: { top: number; right: number; bottom: number; left: number };
	animate?: boolean;
	animationDuration?: number;
}

const defaultMargin = { top: 20, right: 20, bottom: 50, left: 80 };

const VaccinationProgress: React.FC<VaccinationProgressProps> = ({
	percentage,
	data,
	width = 400,
	height = 200,
	margin = defaultMargin,
	animate = true,
	animationDuration = 2000,
}) => {
	const gradientId = useId();
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const [hasAnimated, setHasAnimated] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const {
		tooltipData,
		tooltipLeft,
		tooltipTop,
		tooltipOpen,
		showTooltip,
		hideTooltip,
	} = useTooltip<{ country: string; type: string; value: number }>();

	const radius = 55;
	const circumference = 2 * Math.PI * radius;
	const targetOffset = circumference - (percentage / 100) * circumference;

	const circleAnimation = useSpring({
		strokeDashoffset: animate && !hasAnimated ? circumference : targetOffset,
		config: { duration: animationDuration },
	});

	const percentageAnimation = useSpring({
		number: animate && !hasAnimated ? 0 : percentage,
		config: { duration: animationDuration },
	});

	useEffect(() => {
		if (animate && !hasAnimated) {
			setTimeout(() => setHasAnimated(true), 100);
		}
	}, [animate, hasAnimated]);

	// Scales for bar chart
	const xScale = scaleLinear({
		domain: [0, Math.max(...data.map((d) => Math.max(d.recovered, d.tests)))],
		range: [0, innerWidth],
		nice: true,
	});

	const yScale = scaleBand({
		domain: data.map((d) => d.label),
		range: [0, innerHeight],
		padding: 0.2,
	});

	// Animate bar widths
	const recoveredSprings = useSprings(
		data.length,
		data.map((d) => ({
			width: animate && !hasAnimated ? 0 : xScale(d.recovered),
			config: { duration: animationDuration, tension: 120, friction: 14 },
		})),
	);

	const testsSprings = useSprings(
		data.length,
		data.map((d) => ({
			width: animate && !hasAnimated ? 0 : xScale(d.tests),
			config: { duration: animationDuration, tension: 120, friction: 14 },
		})),
	);

	return (
		<div className={styles.container} style={{ position: "relative" }}>
			{/* Circular Progress */}
			<div className={styles.circleContainer}>
				<svg
					width={140}
					height={140}
					role="img"
					aria-label="Vaccination progress"
				>
					<defs>
						<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#407db6" />
							<stop offset="100%" stopColor="#34d399" />
						</linearGradient>
					</defs>
					<circle
						cx={70}
						cy={70}
						r={radius}
						fill="none"
						stroke="rgba(255, 255, 255, 0.1)"
						strokeWidth={8}
					/>
					<animated.circle
						cx={70}
						cy={70}
						r={radius}
						fill="none"
						stroke={`url(#${gradientId})`}
						strokeWidth={8}
						strokeDasharray={circumference}
						strokeDashoffset={
							animate ? circleAnimation.strokeDashoffset : targetOffset
						}
						strokeLinecap="round"
						transform={`rotate(-90 70 70)`}
						className={styles.progressCircle}
					/>
					<text
						x={70}
						y={70}
						textAnchor="middle"
						dominantBaseline="middle"
						className={styles.percentageText}
					>
						{animate ? (
							<animated.tspan>
								{percentageAnimation.number.to((n) => `${Math.floor(n)}`)}
							</animated.tspan>
						) : (
							percentage
						)}
						%
					</text>
					<text
						x={70}
						y={90}
						textAnchor="middle"
						dominantBaseline="middle"
						className={styles.labelText}
					>
						Worldwide
					</text>
				</svg>
			</div>

			{/* Bar Chart */}
			<div
				className={styles.chartContainer}
				style={{ position: "relative" }}
				ref={containerRef}
			>
				<svg
					width={width}
					height={height}
					role="img"
					aria-label="Recovery and testing statistics chart"
				>
					<Group left={margin.left} top={margin.top}>
						{/* Recovered bars */}
						{data.map((d, i) => {
							const barHeight = yScale.bandwidth() / 2.5;
							const barY = (yScale(d.label) || 0) + barHeight / 2;

							return (
								<animated.rect
									key={`recovered-${d.label}`}
									x={0}
									y={barY - barHeight}
									width={recoveredSprings[i].width}
									height={barHeight - 2}
									fill="#34d399"
									opacity={0.8}
									onMouseMove={(event) => {
										const containerRect =
											containerRef.current?.getBoundingClientRect();
										if (containerRect) {
											showTooltip({
												tooltipData: {
													country: d.label,
													type: "Recovered",
													value: d.recovered,
												},
												tooltipLeft: event.clientX - containerRect.left,
												tooltipTop: event.clientY - containerRect.top,
											});
										}
									}}
									onMouseLeave={hideTooltip}
									style={{ cursor: "pointer" }}
								/>
							);
						})}{" "}
						{/* Tests bars */}
						{data.map((d, i) => {
							const barHeight = yScale.bandwidth() / 2.5;
							const barY = (yScale(d.label) || 0) + barHeight / 2;

							return (
								<animated.rect
									key={`tests-${d.label}`}
									x={0}
									y={barY}
									width={testsSprings[i].width}
									height={barHeight - 2}
									fill="#407db6"
									opacity={0.8}
									onMouseMove={(event) => {
										const containerRect =
											containerRef.current?.getBoundingClientRect();
										if (containerRect) {
											showTooltip({
												tooltipData: {
													country: d.label,
													type: "Tests Conducted",
													value: d.tests,
												},
												tooltipLeft: event.clientX - containerRect.left,
												tooltipTop: event.clientY - containerRect.top,
											});
										}
									}}
									onMouseLeave={hideTooltip}
									style={{ cursor: "pointer" }}
								/>
							);
						})}{" "}
						<AxisLeft
							scale={yScale}
							stroke="rgba(153, 170, 231, 0.3)"
							tickStroke="rgba(153, 170, 231, 0.3)"
							tickLabelProps={() => ({
								fill: "#99aae7",
								fontSize: 11,
								textAnchor: "end",
								dy: "0em",
							})}
						/>
						<AxisBottom
							top={innerHeight}
							scale={xScale}
							stroke="rgba(153, 170, 231, 0.3)"
							tickStroke="rgba(153, 170, 231, 0.3)"
							numTicks={5}
							tickLabelProps={() => ({
								fill: "#99aae7",
								fontSize: 11,
								textAnchor: "middle",
							})}
						/>
					</Group>
				</svg>
				<div className={styles.legend}>
					<div className={styles.legendItem}>
						<span
							className={styles.legendColor}
							style={{ backgroundColor: "#34d399" }}
						/>
						<span>Recovered</span>
					</div>
					<div className={styles.legendItem}>
						<span
							className={styles.legendColor}
							style={{ backgroundColor: "#407db6" }}
						/>
						<span>Tests Conducted</span>
					</div>
				</div>
			</div>

			{/* Tooltip */}
			{tooltipOpen && tooltipData && (
				<TooltipWithBounds
					top={tooltipTop}
					left={tooltipLeft}
					style={{
						...defaultStyles,
						backgroundColor: "rgba(17, 24, 39, 0.95)",
						border: "1px solid rgba(153, 170, 231, 0.3)",
						color: "#fff",
						padding: "12px",
						borderRadius: "8px",
						fontSize: "13px",
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
					}}
				>
					<div style={{ marginBottom: "4px", fontWeight: 600 }}>
						{tooltipData.country}
					</div>
					<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
						<span
							style={{
								width: "10px",
								height: "10px",
								borderRadius: "2px",
								backgroundColor:
									tooltipData.type === "Recovered" ? "#34d399" : "#407db6",
								display: "inline-block",
							}}
						/>
						<span style={{ color: "#99aae7" }}>{tooltipData.type}:</span>
						<span style={{ fontWeight: 600 }}>
							{numeral(tooltipData.value).format("0,0")}
						</span>
					</div>
				</TooltipWithBounds>
			)}
		</div>
	);
};

export default VaccinationProgress;
