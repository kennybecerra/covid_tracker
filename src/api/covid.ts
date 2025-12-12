// ===========================
// Base Configuration
// ===========================

const BASE_URL = "https://disease.sh/v3/covid-19";

// ===========================
// Cache Configuration
// ===========================

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface CacheEntry<T> {
	data: T;
	timestamp: number;
}

class APICache {
	private cache = new Map<string, CacheEntry<unknown>>();

	get<T>(key: string): T | null {
		const entry = this.cache.get(key) as CacheEntry<T> | undefined;
		if (!entry) return null;

		const now = Date.now();
		const isExpired = now - entry.timestamp > CACHE_DURATION;

		if (isExpired) {
			this.cache.delete(key);
			return null;
		}

		return entry.data;
	}

	set<T>(key: string, data: T): void {
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
		});
	}

	clear(): void {
		this.cache.clear();
	}

	clearExpired(): void {
		const now = Date.now();
		for (const [key, entry] of this.cache.entries()) {
			if (now - entry.timestamp > CACHE_DURATION) {
				this.cache.delete(key);
			}
		}
	}
}

const apiCache = new APICache();

// ===========================
// TypeScript Type Definitions
// ===========================

/**
 * Country/Geographic Information
 */
export interface CountryInfo {
	_id: number;
	iso2: string;
	iso3: string;
	lat: number;
	long: number;
	flag: string;
}

/**
 * Core COVID-19 Statistics (shared across worldwide, country, and state data)
 */
export interface CovidStatistics {
	updated: number; // Unix timestamp in milliseconds
	cases: number;
	todayCases: number;
	deaths: number;
	todayDeaths: number;
	recovered: number;
	todayRecovered: number;
	active: number;
	critical: number;
	casesPerOneMillion: number;
	deathsPerOneMillion: number;
	tests: number;
	testsPerOneMillion: number;
	population: number;
	oneCasePerPeople: number;
	oneDeathPerPeople: number;
	oneTestPerPeople: number;
	activePerOneMillion: number;
	recoveredPerOneMillion: number;
	criticalPerOneMillion: number;
}

/**
 * Worldwide COVID-19 Data
 */
export interface CovidWorldwideData extends CovidStatistics {
	affectedCountries: number;
}

/**
 * Country-specific COVID-19 Data
 */
export interface CovidCountryData extends CovidStatistics {
	country: string;
	countryInfo: CountryInfo;
	continent: string;
}

/**
 * US State COVID-19 Data
 */
export interface CovidStateData extends CovidStatistics {
	state: string;
}

/**
 * Historical Timeline Data (date-keyed records)
 */
export interface CovidTimelineData {
	cases: Record<string, number>;
	deaths: Record<string, number>;
	recovered: Record<string, number>;
}

/**
 * Historical Data for Worldwide
 */
export interface CovidHistoricalWorldwide extends CovidTimelineData {}

/**
 * Historical Data for a Specific Country
 */
export interface CovidHistoricalCountry {
	country: string;
	province: string[];
	timeline: CovidTimelineData;
}

/**
 * Historical Data for Multiple Countries
 */
export interface CovidHistoricalMultipleCountries {
	[countryName: string]: {
		country: string;
		province: string[];
		timeline: CovidTimelineData;
	};
}

/**
 * Historical Data for US State
 */
export interface CovidHistoricalState {
	state: string;
	timeline: CovidTimelineData;
}

/**
 * Individual Data Point for Charts
 */
export interface CovidDataPoint {
	date: string;
	value: number;
}

/**
 * Formatted Historical Data for Chart Consumption
 */
export interface CovidTimeSeriesData {
	cases: CovidDataPoint[];
	deaths: CovidDataPoint[];
	recovered: CovidDataPoint[];
}

/**
 * Vaccine Coverage Data
 */
export interface CovidVaccineData {
	updated: number;
	cases: number;
	todayCases: number;
	deaths: number;
	todayDeaths: number;
	recovered: number;
	todayRecovered: number;
	active: number;
	critical: number;
	casesPerOneMillion: number;
	deathsPerOneMillion: number;
	tests: number;
	testsPerOneMillion: number;
	population: number;
	continent: string;
	oneCasePerPeople: number;
	oneDeathPerPeople: number;
	oneTestPerPeople: number;
	activePerOneMillion: number;
	recoveredPerOneMillion: number;
	criticalPerOneMillion: number;
}

// ===========================
// API Query Parameters
// ===========================

export interface QueryParams extends Record<string, unknown> {
	yesterday?: boolean | "1" | "0" | "true" | "false";
	twoDaysAgo?: boolean | "1" | "0" | "true" | "false";
	sort?: string;
	allowNull?: boolean | "1" | "0" | "true" | "false";
}

export interface HistoricalQueryParams extends Record<string, unknown> {
	lastdays?: number | "all";
}

// ===========================
// Helper Functions
// ===========================

/**
 * Transform historical timeline data into array format for charts
 */
export const transformTimelineData = (
	timeline: CovidTimelineData,
): CovidTimeSeriesData => {
	return {
		cases: Object.entries(timeline.cases).map(([date, value]) => ({
			date,
			value,
		})),
		deaths: Object.entries(timeline.deaths).map(([date, value]) => ({
			date,
			value,
		})),
		recovered: Object.entries(timeline.recovered).map(([date, value]) => ({
			date,
			value,
		})),
	};
};

/**
 * Build query string from params object using URLSearchParams
 */
const buildQueryString = (params?: Record<string, unknown>): string => {
	if (!params || Object.keys(params).length === 0) return "";

	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			searchParams.append(key, String(value));
		}
	});

	const queryString = searchParams.toString();
	return queryString ? `?${queryString}` : "";
};

/**
 * Generic fetch wrapper with error handling and caching
 */
const fetchWithErrorHandling = async <T>(
	url: string,
	useCache = true,
): Promise<T> => {
	// Check cache first if enabled
	if (useCache) {
		const cached = apiCache.get<T>(url);
		if (cached !== null) {
			console.log(`Cache hit for: ${url}`);
			return cached;
		}
	}

	try {
		console.log(`Fetching from API: ${url}`);
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();

		// Store in cache if enabled
		if (useCache) {
			apiCache.set(url, data);
		}

		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};

// ===========================
// API Functions
// ===========================

/**
 * Fetch worldwide COVID-19 statistics
 */
export const fetchWorldwideData = async (
	params?: QueryParams,
): Promise<CovidWorldwideData> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidWorldwideData>(
		`${BASE_URL}/all${queryString}`,
	);
};

/**
 * Fetch all countries COVID-19 data
 */
export const fetchAllCountries = async (
	params?: QueryParams,
): Promise<CovidCountryData[]> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidCountryData[]>(
		`${BASE_URL}/countries${queryString}`,
	);
};

/**
 * Fetch specific country COVID-19 data
 */
export const fetchCountryData = async (
	country: string,
	params?: QueryParams,
): Promise<CovidCountryData> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidCountryData>(
		`${BASE_URL}/countries/${country}${queryString}`,
	);
};

/**
 * Fetch multiple countries COVID-19 data
 */
export const fetchMultipleCountries = async (
	countries: string[],
	params?: QueryParams,
): Promise<CovidCountryData[]> => {
	const countryString = countries.join(",");
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidCountryData[]>(
		`${BASE_URL}/countries/${countryString}${queryString}`,
	);
};

/**
 * Fetch all US states COVID-19 data
 */
export const fetchAllStates = async (
	params?: QueryParams,
): Promise<CovidStateData[]> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidStateData[]>(
		`${BASE_URL}/states${queryString}`,
	);
};

/**
 * Fetch specific US state COVID-19 data
 */
export const fetchStateData = async (
	state: string,
	params?: QueryParams,
): Promise<CovidStateData> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidStateData>(
		`${BASE_URL}/states/${state}${queryString}`,
	);
};

/**
 * Fetch worldwide historical data
 */
export const fetchWorldwideHistorical = async (
	params?: HistoricalQueryParams,
): Promise<CovidHistoricalWorldwide> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidHistoricalWorldwide>(
		`${BASE_URL}/historical/all${queryString}`,
	);
};

/**
 * Fetch historical data for a specific country
 */
export const fetchCountryHistorical = async (
	country: string,
	params?: HistoricalQueryParams,
): Promise<CovidHistoricalCountry> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidHistoricalCountry>(
		`${BASE_URL}/historical/${country}${queryString}`,
	);
};

/**
 * Fetch historical data for multiple countries
 */
export const fetchMultipleCountriesHistorical = async (
	countries: string[],
	params?: HistoricalQueryParams,
): Promise<CovidHistoricalMultipleCountries> => {
	const countryString = countries.join(",");
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidHistoricalMultipleCountries>(
		`${BASE_URL}/historical/${countryString}${queryString}`,
	);
};

/**
 * Fetch historical data for a specific country and province
 */
export const fetchCountryProvinceHistorical = async (
	country: string,
	province: string,
	params?: HistoricalQueryParams,
): Promise<CovidHistoricalCountry> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidHistoricalCountry>(
		`${BASE_URL}/historical/${country}/${province}${queryString}`,
	);
};

/**
 * Fetch historical data for US states
 */
export const fetchStatesHistorical = async (
	states: string | string[],
	params?: HistoricalQueryParams,
): Promise<CovidHistoricalState | CovidHistoricalState[]> => {
	const stateString = Array.isArray(states) ? states.join(",") : states;
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidHistoricalState | CovidHistoricalState[]>(
		`${BASE_URL}/historical/usacounties/${stateString}${queryString}`,
	);
};

/**
 * Fetch continents COVID-19 data
 */
export const fetchContinentsData = async (
	params?: QueryParams,
): Promise<CovidCountryData[]> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidCountryData[]>(
		`${BASE_URL}/continents${queryString}`,
	);
};

/**
 * Fetch specific continent COVID-19 data
 */
export const fetchContinentData = async (
	continent: string,
	params?: QueryParams,
): Promise<CovidCountryData> => {
	const queryString = buildQueryString(params);
	return fetchWithErrorHandling<CovidCountryData>(
		`${BASE_URL}/continents/${continent}${queryString}`,
	);
};

// Exports

export const CovidAPI = {
	// Current data
	fetchWorldwideData,
	fetchAllCountries,
	fetchCountryData,
	fetchMultipleCountries,
	fetchAllStates,
	fetchStateData,
	fetchContinentsData,
	fetchContinentData,

	// Historical data
	fetchWorldwideHistorical,
	fetchCountryHistorical,
	fetchMultipleCountriesHistorical,
	fetchCountryProvinceHistorical,
	fetchStatesHistorical,

	// Helpers
	transformTimelineData,

	// Cache management
	clearCache: () => apiCache.clear(),
	clearExpiredCache: () => apiCache.clearExpired(),
};
