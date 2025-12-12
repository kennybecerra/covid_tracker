import { Mercator } from "@visx/geo";
import { scaleLinear } from "@visx/scale";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import * as topojson from "topojson-client";
import styles from "./WorldMap.module.scss";

// World topology type
interface WorldTopology {
	type: string;
	objects: {
		countries: {
			type: string;
			geometries: Array<{
				type: string;
				id: string;
				properties: { name: string };
			}>;
		};
	};
	arcs: number[][][];
}

export interface CountryData {
	cases: number;
	deaths: number;
	name: string;
}

export interface CountryDataMap {
	[countryCode: string]: CountryData;
}

export interface WorldMapProps {
	data: CountryDataMap;
	width?: number;
	height?: number;
	colorScale?: [string, string];
	onCountryClick?: (countryCode: string, countryData: any) => void;
}

// World topology URL from CDN
const WORLD_TOPOLOGY_URL =
	"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap: React.FC<WorldMapProps> = ({
	data,
	width: propWidth,
	height: propHeight,
	colorScale = ["#d8e6ef", "#407db6"],
	onCountryClick,
}) => {
	const clipPathId = useId();
	const containerRef = useRef<HTMLDivElement>(null);
	const [topology, setTopology] = useState<WorldTopology | null>(null);
	const [loading, setLoading] = useState(true);
	const [zoom, setZoom] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
	const [tooltipData, setTooltipData] = useState<{
		x: number;
		y: number;
		name: string;
		cases: number;
		deaths: number;
	} | null>(null);
	const [dimensions, setDimensions] = useState({
		width: propWidth || 800,
		height: propHeight || 400,
	});
	const minZoom = 0.5;
	const maxZoom = 4;

	// Fetch world topology on mount
	useEffect(() => {
		const fetchTopology = async () => {
			try {
				const response = await fetch(WORLD_TOPOLOGY_URL);
				const data = await response.json();
				setTopology(data);
			} catch (error) {
				console.error("Failed to load world topology:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchTopology();
	}, []);

	// Handle responsive container sizing
	useEffect(() => {
		if (!containerRef.current) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				setDimensions({
					width: propWidth || width,
					height: propHeight || height,
				});
			}
		});

		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [propWidth, propHeight]);

	// Handle mouse wheel zoom
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();
			const delta = e.deltaY * -0.001;
			const newZoom = Math.min(maxZoom, Math.max(minZoom, zoom + delta));
			setZoom(newZoom);
		};

		container.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			container.removeEventListener("wheel", handleWheel);
		};
	}, [zoom, minZoom, maxZoom]);

	// Handle mouse drag
	const handleMouseDown = (e: React.MouseEvent) => {
		if (zoom > 1) {
			setIsDragging(true);
			setDragStart({
				x: e.clientX - position.x,
				y: e.clientY - position.y,
			});
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isDragging && zoom > 1) {
			e.preventDefault();
			setPosition({
				x: e.clientX - dragStart.x,
				y: e.clientY - dragStart.y,
			});
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mouseup", handleMouseUp as any);
			return () => {
				document.removeEventListener("mouseup", handleMouseUp as any);
			};
		}
	}, [isDragging]);

	const { features, colorScaleFunc, dataByName } = useMemo(() => {
		if (!topology || !topology.objects?.countries) {
			return {
				features: [],
				colorScaleFunc: () => colorScale[0],
				dataByName: {},
			};
		}

		const features = (
			topojson.feature(topology, topology.objects.countries) as any
		).features;

		// Create a lookup by country name for matching
		const dataByName: Record<string, CountryData> = {};
		for (const [_code, countryData] of Object.entries(data)) {
			const normalizedName = countryData.name.toLowerCase().trim();
			dataByName[normalizedName] = countryData;
		}

		const maxCases = Math.max(...Object.values(data).map((d) => d.cases), 1);

		const colorScaleFunc = scaleLinear({
			domain: [0, maxCases],
			range: colorScale,
		});

		return { features, colorScaleFunc, dataByName };
	}, [topology, data, colorScale]);

	const getCasesForCountry = (feature: any): CountryData | undefined => {
		const countryName = feature.properties?.name?.toLowerCase().trim();
		if (!countryName) return undefined;

		// Direct match
		if (dataByName[countryName]) return dataByName[countryName];

		// Common name variations
		const nameVariations: Record<string, string[]> = {
			"united states of america": ["usa", "united states", "us"],
			"united kingdom": ["uk"],
			"russian federation": ["russia"],
			"korea, republic of": ["south korea", "s. korea"],
			"iran, islamic republic of": ["iran"],
			czechia: ["czech republic"],
		};

		for (const [atlasName, variations] of Object.entries(nameVariations)) {
			if (countryName === atlasName) {
				for (const variant of variations) {
					if (dataByName[variant]) return dataByName[variant];
				}
			}
		}

		return undefined;
	};

	const handleZoomIn = () => {
		setZoom((prev) => Math.min(prev * 1.3, maxZoom));
	};

	const handleZoomOut = () => {
		setZoom((prev) => Math.max(prev / 1.3, minZoom));
	};

	const handleResetZoom = () => {
		setZoom(1);
		setPosition({ x: 0, y: 0 });
	};

	if (loading) {
		return (
			<div
				ref={containerRef}
				className={styles.mapContainer}
				style={{
					width: propWidth || "100%",
					height: propHeight || "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<span style={{ color: "rgba(255, 255, 255, 0.5)" }}>
					Loading map...
				</span>
			</div>
		);
	}

	const { width, height } = dimensions;

	return (
		<div
			ref={containerRef}
			className={styles.mapContainer}
			style={{
				width: propWidth || "100%",
				height: propHeight || "100%",
				position: "relative",
				overflow: "hidden",
				cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
			}}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => {
				setIsDragging(false);
				setHoveredCountry(null);
				setTooltipData(null);
			}}
		>
			{/* Zoom Controls */}
			<div
				style={{
					position: "absolute",
					top: "10px",
					right: "10px",
					display: "flex",
					flexDirection: "column",
					gap: "8px",
					zIndex: 10,
				}}
			>
				<button
					type="button"
					onClick={handleZoomIn}
					disabled={zoom >= maxZoom}
					style={{
						padding: "8px 12px",
						background: "rgba(255, 255, 255, 0.9)",
						border: "1px solid rgba(0, 0, 0, 0.2)",
						borderRadius: "4px",
						cursor: zoom >= maxZoom ? "not-allowed" : "pointer",
						fontWeight: "bold",
						fontSize: "16px",
						opacity: zoom >= maxZoom ? 0.5 : 1,
					}}
					title="Zoom In"
				>
					+
				</button>
				<button
					type="button"
					onClick={handleZoomOut}
					disabled={zoom <= minZoom}
					style={{
						padding: "8px 12px",
						background: "rgba(255, 255, 255, 0.9)",
						border: "1px solid rgba(0, 0, 0, 0.2)",
						borderRadius: "4px",
						cursor: zoom <= minZoom ? "not-allowed" : "pointer",
						fontWeight: "bold",
						fontSize: "16px",
						opacity: zoom <= minZoom ? 0.5 : 1,
					}}
					title="Zoom Out"
				>
					−
				</button>
				<button
					type="button"
					onClick={handleResetZoom}
					disabled={zoom === 1}
					style={{
						padding: "8px 12px",
						background: "rgba(255, 255, 255, 0.9)",
						border: "1px solid rgba(0, 0, 0, 0.2)",
						borderRadius: "4px",
						cursor: zoom === 1 ? "not-allowed" : "pointer",
						fontSize: "12px",
						opacity: zoom === 1 ? 0.5 : 1,
					}}
					title="Reset Zoom"
				>
					⟲
				</button>
			</div>

			<svg width={width} height={height} role="img" aria-label="World map">
				<defs>
					<clipPath id={clipPathId}>
						<rect width={width} height={height} />
					</clipPath>
				</defs>

				<g
					clipPath={`url(#${clipPathId})`}
					transform={`translate(${position.x}, ${position.y})`}
				>
					<Mercator
						data={features}
						scale={(width / 6) * zoom}
						translate={[width / 2, height / 1.5]}
					>
						{(mercator) => (
							<g>
								{mercator.features.map(({ feature, path }, i) => {
									const countryData = getCasesForCountry(feature as any);
									const cases = countryData?.cases || 0;
									const countryName = (feature as any).properties?.name || "";
									const isHovered = hoveredCountry === countryName;

									// Always render countries - use base color for countries without data
									const fillColor =
										cases > 0 ? colorScaleFunc(cases) : colorScale[0]; // Use lightest color from scale as default

									return (
										<path
											key={`map-feature-${i}`}
											d={path || ""}
											fill={fillColor}
											stroke={isHovered ? "#fff" : "rgba(255, 255, 255, 0.3)"}
											strokeWidth={isHovered ? 2 : 0.5}
											className={styles.country}
											data-hovered={isHovered}
											onMouseEnter={(e) => {
												setHoveredCountry(countryName);
												if (countryData) {
													const rect = e.currentTarget.getBoundingClientRect();
													const containerRect =
														e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
													setTooltipData({
														x: e.clientX - (containerRect?.left || 0),
														y: e.clientY - (containerRect?.top || 0),
														name: countryData.name,
														cases: countryData.cases,
														deaths: countryData.deaths,
													});
												}
											}}
											onMouseMove={(e) => {
												if (countryData && tooltipData) {
													const containerRect =
														e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
													setTooltipData({
														...tooltipData,
														x: e.clientX - (containerRect?.left || 0),
														y: e.clientY - (containerRect?.top || 0),
													});
												}
											}}
											onMouseLeave={() => {
												setHoveredCountry(null);
												setTooltipData(null);
											}}
											onClick={() => {
												if (onCountryClick && countryData) {
													onCountryClick(countryName, countryData);
												}
											}}
											style={{
												cursor: cases > 0 ? "pointer" : "default",
												transform: isHovered ? "scale(1.02)" : "scale(1)",
												transformOrigin: "center",
												transition: "all 0.2s ease-out",
											}}
										/>
									);
								})}
							</g>
						)}
					</Mercator>
				</g>
			</svg>

			{/* Tooltip */}
			{tooltipData && (
				<div
					style={{
						position: "absolute",
						left: tooltipData.x + 10,
						top: tooltipData.y + 10,
						background: "rgba(0, 0, 0, 0.9)",
						color: "white",
						padding: "12px 16px",
						borderRadius: "8px",
						pointerEvents: "none",
						zIndex: 1000,
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
						fontSize: "14px",
						lineHeight: "1.5",
						whiteSpace: "nowrap",
					}}
				>
					<div style={{ fontWeight: "bold", marginBottom: "8px" }}>
						{tooltipData.name}
					</div>
					<div>
						<span style={{ color: "#fbbf24" }}>Cases:</span>{" "}
						{tooltipData.cases.toLocaleString()}
					</div>
					<div>
						<span style={{ color: "#ef4444" }}>Deaths:</span>{" "}
						{tooltipData.deaths.toLocaleString()}
					</div>
				</div>
			)}
		</div>
	);
};

export default WorldMap;
