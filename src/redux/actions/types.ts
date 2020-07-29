export enum ActionTypes {
  RequestData = 'REQUEST_DATA',
  RequestDataSuccess = 'REQUEST_DATA_SUCCESS',
  RequestDataFailure = 'REQUEST_DATA_FAILURE',
}

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
