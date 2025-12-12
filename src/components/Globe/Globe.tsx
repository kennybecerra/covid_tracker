import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import type { CovidCountryData } from "../../api/covid";
import { fetchAllCountries } from "../../api/covid";
import geoData from "../../utility/geoData.json";
import styles from "./Globe.module.scss";

type MetricType =
	| "cases"
	| "deaths"
	| "tests"
	| "casesPerMillion"
	| "deathsPerMillion"
	| "testsPerMillion";

interface CountryPolygon {
	type: string;
	properties: {
		name: string;
		iso_a2: string;
		[key: string]: unknown;
	};
	geometry: unknown;
}

interface CountryDataMap {
	[key: string]: {
		cases: number;
		deaths: number;
		tests: number;
		casesPerMillion: number;
		deathsPerMillion: number;
		testsPerMillion: number;
		color: string;
	};
}

const getColorForMetric = (
	value: number,
	metric: MetricType,
	maxValue: number,
): string => {
	const ratio = maxValue > 0 ? value / maxValue : 0;

	if (metric === "deaths" || metric === "deathsPerMillion") {
		// Red gradient for deaths
		if (ratio > 0.7) return "#7f1d1d"; // Very dark red
		if (ratio > 0.5) return "#dc2626"; // Dark red
		if (ratio > 0.3) return "#ef4444"; // Red
		if (ratio > 0.15) return "#f87171"; // Light red
		if (ratio > 0.05) return "#fca5a5"; // Lighter red
		return "#fecaca"; // Very light red
	} else if (metric === "tests" || metric === "testsPerMillion") {
		// Green gradient for tests
		if (ratio > 0.7) return "#14532d"; // Very dark green
		if (ratio > 0.5) return "#16a34a"; // Dark green
		if (ratio > 0.3) return "#22c55e"; // Green
		if (ratio > 0.15) return "#4ade80"; // Light green
		if (ratio > 0.05) return "#86efac"; // Lighter green
		return "#dcfce7"; // Very light green
	} else {
		// Blue gradient for cases
		if (ratio > 0.7) return "#1e3a8a"; // Very dark blue
		if (ratio > 0.5) return "#2563eb"; // Dark blue
		if (ratio > 0.3) return "#3b82f6"; // Blue
		if (ratio > 0.15) return "#60a5fa"; // Light blue
		if (ratio > 0.05) return "#93c5fd"; // Lighter blue
		return "#dbeafe"; // Very light blue
	}
};

const CovidGlobe = () => {
	const globeRef = useRef<{
		pointOfView: (
			coords: { lat: number; lng: number; altitude: number },
			ms: number,
		) => void;
		controls: () => { autoRotate: boolean; autoRotateSpeed: number };
	}>();
	const [countryData, setCountryData] = useState<CountryDataMap>({});
	const [polygons, setPolygons] = useState<CountryPolygon[]>([]);
	const [loading, setLoading] = useState(true);
	const [metric, setMetric] = useState<MetricType>("cases");
	useEffect(() => {
		const loadCovidData = async () => {
			try {
				setLoading(true);
				const data: CovidCountryData[] = await fetchAllCountries();

				// Create a map of country data by ISO code and country name
				const dataMap: CountryDataMap = {};

				// Find max values for color scaling
				const maxCases = Math.max(...data.map((c) => c.cases));
				const maxDeaths = Math.max(...data.map((c) => c.deaths));
				const maxTests = Math.max(...data.map((c) => c.tests));
				const maxCasesPerMillion = Math.max(
					...data.map((c) => c.casesPerOneMillion),
				);
				const maxDeathsPerMillion = Math.max(
					...data.map((c) => c.deathsPerOneMillion),
				);
				const maxTestsPerMillion = Math.max(
					...data.map((c) => c.testsPerOneMillion),
				);

				data.forEach((country) => {
					if (country.cases > 0 || country.deaths > 0) {
						let currentMetric = 0;
						let maxValue = 0;

						switch (metric) {
							case "cases":
								currentMetric = country.cases;
								maxValue = maxCases;
								break;
							case "deaths":
								currentMetric = country.deaths;
								maxValue = maxDeaths;
								break;
							case "tests":
								currentMetric = country.tests;
								maxValue = maxTests;
								break;
							case "casesPerMillion":
								currentMetric = country.casesPerOneMillion;
								maxValue = maxCasesPerMillion;
								break;
							case "deathsPerMillion":
								currentMetric = country.deathsPerOneMillion;
								maxValue = maxDeathsPerMillion;
								break;
							case "testsPerMillion":
								currentMetric = country.testsPerOneMillion;
								maxValue = maxTestsPerMillion;
								break;
						}

						const color = getColorForMetric(currentMetric, metric, maxValue);

						// Store by both ISO code and country name for matching
						if (country.countryInfo?.iso2) {
							dataMap[country.countryInfo.iso2] = {
								cases: country.cases,
								deaths: country.deaths,
								tests: country.tests,
								casesPerMillion: country.casesPerOneMillion,
								deathsPerMillion: country.deathsPerOneMillion,
								testsPerMillion: country.testsPerOneMillion,
								color,
							};
						}
						dataMap[country.country] = {
							cases: country.cases,
							deaths: country.deaths,
							tests: country.tests,
							casesPerMillion: country.casesPerOneMillion,
							deathsPerMillion: country.deathsPerOneMillion,
							testsPerMillion: country.testsPerOneMillion,
							color,
						};
					}
				});

				setCountryData(dataMap);
				setPolygons(geoData.features as CountryPolygon[]);
				setLoading(false);
			} catch (error) {
				console.error("Error loading COVID data:", error);
				setLoading(false);
			}
		};

		loadCovidData();
	}, [metric]);

	useEffect(() => {
		// Auto-rotate the globe
		if (globeRef.current) {
			const globe = globeRef.current;

			// Set initial view
			globe.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);

			// Enable auto-rotate
			const controls = globe.controls();
			controls.autoRotate = true;
			controls.autoRotateSpeed = 0.5;
		}
	}, []);

	if (loading) {
		return (
			<div className={styles.globeContainer}>
				<div className={styles.loading}>
					<div className={styles.spinner} />
					<p>Loading COVID-19 data...</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.globeContainer}>
			<div className={styles.controls}>
				<label htmlFor="metric-select-covid">View by:</label>
				<select
					id="metric-select-covid"
					value={metric}
					onChange={(e) => setMetric(e.target.value as MetricType)}
					className={styles.dropdown}
				>
					<option value="cases">Cases</option>
					<option value="deaths">Deaths</option>
					<option value="tests">Tests</option>
					<option value="casesPerMillion">Cases per Million</option>
					<option value="deathsPerMillion">Deaths per Million</option>
					<option value="testsPerMillion">Tests per Million</option>
				</select>
			</div>

			<div className={styles.globeWrapper}>
				<Globe
					ref={globeRef}
					globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
					backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
					// Use polygons instead of points
					polygonsData={polygons}
					polygonCapColor={(d: unknown) => {
						const polygon = d as CountryPolygon;
						const iso = polygon.properties.iso_a2;
						const name = polygon.properties.name;

						// Try to match by ISO code first, then by name
						const data = countryData[iso] || countryData[name];
						return data?.color || "rgba(100, 100, 100, 0.3)";
					}}
					polygonSideColor={() => "rgba(0, 0, 0, 0.1)"}
					polygonStrokeColor={() => "#333"}
					polygonAltitude={0.01}
					polygonLabel={(d: unknown) => {
						const polygon = d as CountryPolygon;
						const iso = polygon.properties.iso_a2;
						const name = polygon.properties.name;
						const data = countryData[iso] || countryData[name];

						if (!data) {
							return `
								<div style="
									background: rgba(0, 0, 0, 0.9);
									padding: 12px;
									border-radius: 8px;
									border: 1px solid rgba(153, 170, 231, 0.3);
									color: white;
									font-family: system-ui, -apple-system, sans-serif;
								">
									<div style="font-weight: 600; font-size: 14px;">
										${name}
									</div>
									<div style="color: #999; margin-top: 4px; font-size: 12px;">
										No data available
									</div>
								</div>
							`;
						}

						return `
							<div style="
								background: rgba(0, 0, 0, 0.9);
								padding: 12px;
								border-radius: 8px;
								border: 1px solid rgba(153, 170, 231, 0.3);
								color: white;
								font-family: system-ui, -apple-system, sans-serif;
							">
								<div style="font-weight: 600; margin-bottom: 8px; font-size: 14px; border-bottom: 1px solid rgba(153, 170, 231, 0.3); padding-bottom: 6px;">
									${name}
								</div>
								<div style="color: #60a5fa; margin-bottom: 4px; font-size: 13px;">
									Cases: ${data.cases.toLocaleString()}
								</div>
								<div style="color: #f87171; margin-bottom: 4px; font-size: 13px;">
									Deaths: ${data.deaths.toLocaleString()}
								</div>
								<div style="color: #4ade80; margin-bottom: 6px; font-size: 13px;">
									Tests: ${data.tests.toLocaleString()}
								</div>
								<div style="color: #93c5fd; font-size: 12px; margin-top: 4px; padding-top: 6px; border-top: 1px solid rgba(153, 170, 231, 0.2);">
									Cases/M: ${Math.round(data.casesPerMillion).toLocaleString()}
								</div>
								<div style="color: #fca5a5; font-size: 12px;">
									Deaths/M: ${Math.round(data.deathsPerMillion).toLocaleString()}
								</div>
								<div style="color: #86efac; font-size: 12px;">
									Tests/M: ${Math.round(data.testsPerMillion).toLocaleString()}
								</div>
							</div>
						`;
					}}
					atmosphereColor="#407db6"
					atmosphereAltitude={0.25}
					width={window.innerWidth}
					height={window.innerHeight - 100}
				/>
			</div>

			<div className={styles.legend}>
				<h3>
					COVID-19{" "}
					{metric === "cases"
						? "Cases"
						: metric === "deaths"
							? "Deaths"
							: metric === "tests"
								? "Tests"
								: metric === "casesPerMillion"
									? "Cases per Million"
									: metric === "deathsPerMillion"
										? "Deaths per Million"
										: "Tests per Million"}
				</h3>
				<div className={styles.legendItems}>
					{metric === "deaths" || metric === "deathsPerMillion" ? (
						<>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#7f1d1d" }}
								/>
								<span>Very High</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#dc2626" }}
								/>
								<span>High</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#ef4444" }}
								/>
								<span>Moderate</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#f87171" }}
								/>
								<span>Medium</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#fca5a5" }}
								/>
								<span>Low</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#fecaca" }}
								/>
								<span>Very Low</span>
							</div>
						</>
					) : metric === "tests" || metric === "testsPerMillion" ? (
						<>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#14532d" }}
								/>
								<span>Very High</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#16a34a" }}
								/>
								<span>High</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#22c55e" }}
								/>
								<span>Moderate</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#4ade80" }}
								/>
								<span>Medium</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#86efac" }}
								/>
								<span>Low</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#dcfce7" }}
								/>
								<span>Very Low</span>
							</div>
						</>
					) : (
						<>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#1e3a8a" }}
								/>
								<span>Very High</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#2563eb" }}
								/>
								<span>High</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#3b82f6" }}
								/>
								<span>Moderate</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#60a5fa" }}
								/>
								<span>Medium</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#93c5fd" }}
								/>
								<span>Low</span>
							</div>
							<div className={styles.legendItem}>
								<span
									className={styles.dot}
									style={{ backgroundColor: "#dbeafe" }}
								/>
								<span>Very Low</span>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CovidGlobe;
