interface coordinate {
  latitude: number;
  longitude: number;
}

interface datapoint {
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

export interface chartData {
  code: string;
  coordinates: coordinate;
  latest_data: {
    confirmed: number;
    critical: number;
    deaths: number;
    recovered: number;
  };
  name: string;
  population: number;
  timeline: datapoint[];
  today: {
    confirmed: number;
    deaths: number;
  };
  updated_at: string;
}
