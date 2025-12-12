import { useEffect, useState } from "react";
import type {
	CovidCountryData,
	CovidHistoricalWorldwide,
	CovidWorldwideData,
} from "../../api/covid";
import { CovidAPI } from "../../api/covid";
import type { CountryDataMap, CountryRowData, DataPoint } from "../Charts";
import type { RecoveryTestingData } from "../Charts/VaccinationProgress";
import {
	DailyCasesChart,
	GlobalSummary,
	TopCountriesTable,
	VaccinationSection,
	WorldMapSection,
} from "../CovidSections";
import Header from "../header";
import styles from "./CovidLayout.module.scss";

const CovidLayout = () => {
	const [worldwideData, setWorldwideData] = useState<CovidWorldwideData | null>(
		null,
	);
	const [historicalData, setHistoricalData] =
		useState<CovidHistoricalWorldwide | null>(null);
	const [countriesData, setCountriesData] = useState<CovidCountryData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				// Fetch worldwide current data
				const worldwide = await CovidAPI.fetchWorldwideData();
				setWorldwideData(worldwide);

				// Fetch historical data (last 30 days)
				const historical = await CovidAPI.fetchWorldwideHistorical({
					lastdays: 30,
				});
				setHistoricalData(historical);

				// Fetch all countries sorted by cases
				const countries = await CovidAPI.fetchAllCountries({ sort: "cases" });
				setCountriesData(countries);

				setLoading(false);
			} catch (error) {
				console.error("Error fetching COVID data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Transform historical data for area chart - calculate daily new cases/deaths
	const chartData: DataPoint[] = historicalData
		? Object.entries(historicalData.cases)
				.map(([date, value], index, array) => {
					// Calculate daily new cases by subtracting previous day's total
					const previousValue = index > 0 ? array[index - 1][1] : 0;
					const dailyNew = value - previousValue;

					return {
						date: new Date(date).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "2-digit",
						}),
						value: Math.max(0, dailyNew), // Ensure non-negative values
					};
				})
				.slice(1) // Remove first day since it has no previous day to compare
		: [];

	const deathsData: DataPoint[] = historicalData
		? Object.entries(historicalData.deaths)
				.map(([date, value], index, array) => {
					// Calculate daily new deaths by subtracting previous day's total
					const previousValue = index > 0 ? array[index - 1][1] : 0;
					const dailyNew = value - previousValue;

					return {
						date: new Date(date).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "2-digit",
						}),
						value: Math.max(0, dailyNew), // Ensure non-negative values
					};
				})
				.slice(1) // Remove first day since it has no previous day to compare
		: [];

	// Transform countries data for world map
	const worldMapData: CountryDataMap = countriesData.reduce((acc, country) => {
		acc[country.countryInfo.iso3] = {
			cases: country.cases,
			deaths: country.deaths,
			name: country.country,
		};
		return acc;
	}, {} as CountryDataMap);

	// Transform countries data for table
	const tableData: CountryRowData[] = countriesData.map((country) => ({
		country: country.country,
		flag: country.countryInfo?.flag,
		cases: country.cases,
		deaths: country.deaths,
		tests: country.tests,
		casesPerOneMillion: country.casesPerOneMillion,
		deathsPerOneMillion: country.deathsPerOneMillion,
		testsPerOneMillion: country.testsPerOneMillion,
		casesPercentage: worldwideData
			? Math.round((country.cases / worldwideData.cases) * 100)
			: 0,
		deathsPercentage: worldwideData
			? Math.round((country.deaths / worldwideData.deaths) * 100)
			: 0,
	}));

	// Transform data for recovery & testing statistics - use top 5 countries with real data
	const recoveryTestingData: RecoveryTestingData[] = countriesData.map(
		(country) => ({
			label: country.country,
			recovered: country.recovered,
			tests: country.tests,
		}),
	);

	// Recovery rate percentage (worldwide)
	const recoveryPercentage = worldwideData
		? Math.round((worldwideData.recovered / worldwideData.cases) * 100)
		: 0;

	if (loading || !worldwideData) {
		return (
			<div className={styles.layout}>
				<div className={styles.loading}>Loading COVID-19 Data...</div>
			</div>
		);
	}

	return (
		<div className={styles.layout}>
			<div className={styles.innerContainer}>
				{/* Navigation Bar - Spans 2 columns (Row 1) */}
				<div className={styles.header}>
					<Header />
				</div>

				{/* Column 1, Row 2: Global Summary KPIs */}
				<div className={styles.globalSummary}>
					<GlobalSummary data={worldwideData} animate={true} />
				</div>

				{/* Column 1, Row 3: Daily New Cases Chart */}
				<div className={styles.dailyCases}>
					<DailyCasesChart
						data={chartData}
						deathsData={deathsData}
						animate={true}
					/>
				</div>

				{/* Column 1, Row 4: Top Affected Countries Table */}
				<div className={styles.topCountries}>
					<TopCountriesTable data={tableData} animate={true} />
				</div>

				{/* Column 2, Row 2-3: World Map (spans 2 rows) */}
				<div className={styles.worldMap}>
					<WorldMapSection data={worldMapData} />
				</div>

				{/* Column 2, Row 4: Recovery & Testing Statistics */}
				<div className={styles.vaccination}>
					<VaccinationSection
						data={recoveryTestingData}
						percentage={recoveryPercentage}
						animate={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default CovidLayout;
