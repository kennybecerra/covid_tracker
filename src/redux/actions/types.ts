interface coordinate {
  latitude: number;
  longitude: number;
}

export interface timelineDataPoint {
  active: number;
  confirmed: number;
  date: string;
  deaths: number;
  is_in_progress: boolean;
  new_confirmed: number;
  new_deaths: number;
  new_recovered: number;
  recovered: number;
  updated_at: string;
}

export interface covidData {
  code: string;
  coordinates: coordinate;
  latest_data: {
    confirmed: number;
    critical: number;
    deaths: number;
    recovered: number;
    calculated: {
      cases_per_million_population: number;
      death_rate: number;
      recovered_vs_death_ratio: number | null;
      recovery_rate: number;
    };
  };
  name: string;
  population: number;
  timeline: timelineDataPoint[];
  today: {
    confirmed: number;
    deaths: number;
  };
  updated_at: string;
}

interface KPIDataPoint {
  key: string;
  value: string;
}

export interface KPIData {
  cases_per_million_population: KPIDataPoint;
  confirmed: KPIDataPoint;
  critical: KPIDataPoint;
  death_rate: KPIDataPoint;
  deaths: KPIDataPoint;
  name: KPIDataPoint;
  population: KPIDataPoint;
  recovered: KPIDataPoint;
  recovered_vs_death_ratio: KPIDataPoint;
  recovery_rate: KPIDataPoint;
  updated_at: KPIDataPoint;
}

interface pieSlice {
  name: string;
  value: number;
}

export interface PieData {
  slices: pieSlice[];
  total: number;
}

export interface countriesCovidData {
  coordinates: coordinate;
  name: string;
  code: string;
  population: number;
  updated_at: string;
  today: {
    deaths: number;
    cofnirmed: number;
  };
  latest_data: {
    deaths: number;
    confirmed: number;
    recovered: number;
    critical: number;
    calculated: {
      death_rate: number;
      recovery_rate: number;
      recovered_vs_death_ratio: null;
      cases_per_million_population: number;
    };
  };
  deaths?: number;
  confirmed?: number;
  recovered?: number;
  critical?: number;
}
//  GEO JSON MAPPING

interface feature {
  type: 'Feature';
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number][];
  };
}
export interface geoJSON {
  type: 'FeatureCollection';
  features: feature[];
}

export interface globalTimelineData {
  updated_at: string; // Date
  date: string; // Date
  deaths: number; // Int or null
  confirmed: number; // Int or null
  recovered: number; // Int or null
  active: number; // Int or null
  new_confirmed: number; // Int or null
  new_recovered: number; // Int or null
  new_deaths: number; // Int or null
  is_in_progress: boolean; // Boolean
}
