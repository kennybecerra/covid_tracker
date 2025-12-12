export type { DataPoint, MultiLineChartProps } from "./MultiLineChart";
export { default as MultiLineChart } from "./MultiLineChart";
export type {
	RecoveryTestingData,
	VaccinationProgressProps,
} from "./VaccinationProgress";
export { default as VaccinationProgress } from "./VaccinationProgress";
export type { CountryData, CountryDataMap, WorldMapProps } from "./WorldMap";
export { default as WorldMap } from "./WorldMap";

// Type definitions for components
export interface CountryRowData {
	country: string;
	flag?: string;
	cases: number;
	deaths: number;
	tests?: number;
	casesPerOneMillion?: number;
	deathsPerOneMillion?: number;
	testsPerOneMillion?: number;
	casesPercentage?: number;
	deathsPercentage?: number;
}
