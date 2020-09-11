import { ActionTypes } from './actionTypes';
import {
  covidData,
  countriesCovidData,
  geoJSON,
  globalTimelineData,
} from './types';

import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { GraphState } from '../reducers/graphData';
import { ActionCreator } from 'redux';

// ACTION CREATORS
const RequestCountryDataAction = () => {
  return {
    type: ActionTypes.RequestCountryData,
  } as const;
};

const RequestCountryDataSuccessAction = (data: covidData) => {
  return {
    type: ActionTypes.RequestCountryDataSuccess,
    payload: data,
  } as const;
};

const RequestCountryDataFailureAction = (message: string) => {
  return {
    type: ActionTypes.RequestCountryDataFailure,
    payload: message,
  } as const;
};

type AllRequestCountryDataActions =
  | ReturnType<typeof RequestCountryDataAction>
  | ReturnType<typeof RequestCountryDataSuccessAction>
  | ReturnType<typeof RequestCountryDataFailureAction>;

// ASYNC ACTION CREATOR
export const fetchCountryCovidData: ActionCreator<ThunkAction<
  Promise<void>,
  GraphState,
  string,
  AllRequestCountryDataActions
>> = (countryCode: string) => {
  return async (
    dispatch: ThunkDispatch<GraphState, string, AllRequestCountryDataActions>,
    getState: () => GraphState
  ) => {
    dispatch(RequestCountryDataAction());
    try {
      const results: {
        data: covidData;
      } = await fetch(
        `https://corona-api.com/countries/${countryCode}`
      ).then((res) => res.json());
      dispatch(RequestCountryDataSuccessAction(results.data));
    } catch (err) {
      dispatch(RequestCountryDataFailureAction(err));
    }
  };
};

const RequestCountriesDataAction = () => {
  return {
    type: ActionTypes.RequestCountriesData,
  } as const;
};

const RequestCountriesDataSuccessAction = (
  data: countriesCovidData[],
  geoJSON: geoJSON,
  globalTimelineData: globalTimelineData[]
) => {
  return {
    type: ActionTypes.RequestCountriesDataSuccess,
    payload: { data, geoJSON, globalTimelineData },
  } as const;
};

const RequestCountriesDataFailureAction = (message: string) => {
  return {
    type: ActionTypes.RequestCountriesDataFailure,
    payload: message,
  } as const;
};

type AllRequestCountriesDataActions =
  | ReturnType<typeof RequestCountriesDataAction>
  | ReturnType<typeof RequestCountriesDataSuccessAction>
  | ReturnType<typeof RequestCountriesDataFailureAction>;

// ASYNC ACTION CREATOR
export const fetchCountriesCovidData: ActionCreator<ThunkAction<
  Promise<void>,
  GraphState,
  string,
  AllRequestCountriesDataActions
>> = () => {
  return async (
    dispatch: ThunkDispatch<GraphState, string, AllRequestCountriesDataActions>,
    getState: () => GraphState
  ) => {
    dispatch(RequestCountriesDataAction());
    try {
      const results: { data: countriesCovidData[] } = await fetch(
        `https://corona-api.com/countries`
      ).then((res) => res.json());
      const geoJSON: geoJSON = await fetch(
        'https://raw.githubusercontent.com/plouc/nivo/master/website/src/data/components/geo/world_countries.json'
      )
        .then((res) => res.json())
        .then((result) => {
          return result;
        });

      const globalTimelineData: { data: globalTimelineData[] } = await fetch(
        `https://corona-api.com/timeline`
      ).then((res) => res.json());
      dispatch(
        RequestCountriesDataSuccessAction(
          results.data,
          geoJSON,
          globalTimelineData.data
        )
      );
    } catch (err) {
      dispatch(RequestCountriesDataFailureAction(err));
    }
  };
};

export type AllGraphDataActions =
  | AllRequestCountriesDataActions
  | AllRequestCountryDataActions;
