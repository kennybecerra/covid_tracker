import { covidData } from '../actions/types';
import { ActionTypes } from '../actions/actionTypes';
import { AllGraphDataActions } from '../actions/graphData';
import formatNumber from '../../utility/formatNumber';
import {
  timelineDataPoint,
  KPIData,
  PieData,
  countriesCovidData,
  geoJSON,
} from '../actions/types';
import { Reducer } from 'react';

export interface GraphState {
  readonly loading: boolean;
  readonly error: boolean;
  readonly errorMessage: string;
  readonly data: covidData;
  readonly countriesLoading: boolean;
  readonly countriesError: boolean;
  readonly countriesErrorMessage: string;
  readonly countriesData: countriesCovidData[];
  readonly geoJSON: geoJSON;
  readonly KPI: KPIData;
  readonly timeline: timelineDataPoint[];
  readonly pieData: PieData;
}

const initialState: GraphState = {
  loading: false,
  error: false,
  errorMessage: '',
  data: undefined,
  countriesLoading: false,
  countriesError: false,
  countriesErrorMessage: '',
  countriesData: [],
  geoJSON: undefined,
  KPI: undefined,
  timeline: [],
  pieData: undefined,
};

export const graphDataReducer: Reducer<GraphState, AllGraphDataActions> = (
  state = initialState,
  action: AllGraphDataActions
) => {
  let newState = { ...state };

  switch (action.type) {
    case ActionTypes.RequestCountryData:
      newState.loading = true;
      newState.error = false;
      break;
    case ActionTypes.RequestCountryDataSuccess:
      newState.loading = false;
      newState.error = false;
      newState.data = action.payload;
      newState.KPI = transformToKPIData(action.payload);
      newState.timeline = transformToTimelineData(action.payload);
      newState.pieData = transformToPieData(action.payload);
      break;
    case ActionTypes.RequestCountryDataFailure:
      newState.loading = false;
      newState.error = true;
      newState.errorMessage = action.payload;
      break;
    case ActionTypes.RequestCountriesData:
      newState.countriesLoading = true;
      newState.countriesError = false;
      break;
    case ActionTypes.RequestCountriesDataSuccess:
      newState.countriesLoading = false;
      newState.countriesError = false;
      newState.countriesData = action.payload.data;
      newState.geoJSON = action.payload.geoJSON;
      break;
    case ActionTypes.RequestCountriesDataFailure:
      newState.countriesLoading = false;
      newState.countriesError = true;
      newState.errorMessage = action.payload;
      break;
    default:
      break;
  }

  return newState;
};

// UTILITY Function
const transformToKPIData = (data: covidData): KPIData => {
  const newData = Object.keys(data).reduce((accu, currentKey) => {
    switch (currentKey) {
      case 'name':
        accu[currentKey] = { key: 'Country', value: data[currentKey] };
        break;
      case 'population':
        accu[currentKey] = {
          key: currentKey,
          value: formatNumber(data[currentKey]),
        };
        break;
      case 'updated_at':
        accu[currentKey] = {
          key: 'Last Update',
          value: new Date(data[currentKey]).toLocaleString(),
        };
        break;
      case 'latest_data':
        Object.keys(data[currentKey]).reduce((accu, keySecondLvl) => {
          switch (keySecondLvl) {
            case 'calculated':
              Object.keys(data[currentKey][keySecondLvl]).reduce(
                (accu, keyThirdLvl) => {
                  switch (keyThirdLvl) {
                    case 'cases_per_million_population':
                      accu[keyThirdLvl] = {
                        key: 'cases / Million',
                        value: formatNumber(
                          data[currentKey][keySecondLvl][keyThirdLvl]
                        ),
                      };
                      break;
                    case 'death_rate':
                      accu[keyThirdLvl] = {
                        key: 'death rate',
                        value: formatNumber(
                          data[currentKey][keySecondLvl][keyThirdLvl]
                        ),
                      };
                      break;
                    case 'recovery_rate':
                      accu[keyThirdLvl] = {
                        key: 'recovery rate',
                        value: formatNumber(
                          data[currentKey][keySecondLvl][keyThirdLvl]
                        ),
                      };
                      break;
                    default:
                      accu[keyThirdLvl] = {
                        key: keyThirdLvl,
                        value: formatNumber(
                          data[currentKey][keySecondLvl][keyThirdLvl]
                        ),
                      };
                      break;
                  }

                  return accu;
                },
                accu
              );
              break;
            default:
              accu[keySecondLvl] = {
                key: keySecondLvl,
                value: formatNumber(data[currentKey][keySecondLvl]),
              };
              break;
          }

          return accu;
        }, accu);

        break;
    }
    return accu;
  }, {});

  return newData as KPIData;
};

const transformToTimelineData = (data: covidData): timelineDataPoint[] => {
  return data.timeline
    .map((item) => {
      item['dateNumber'] = Date.parse(item.updated_at);
      return item;
    })
    .reverse();
};

const transformToPieData = (data: covidData): PieData => {
  const slices = Object.entries(data.latest_data)
    .reduce((accu, current) => {
      if (typeof current[1] === 'number' && current[0] !== 'confirmed') {
        accu.push({
          name: current[0],
          value: current[1],
        });
      }
      return accu;
    }, [])
    .filter((item) => item);

  const total =
    typeof data.latest_data.confirmed === 'number'
      ? data.latest_data.confirmed
      : 0;

  return {
    slices,
    total,
  };
};
