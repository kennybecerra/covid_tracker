import { ActionTypes, covidData } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { GraphState } from '../reducers/graphData';
import { ActionCreator } from 'redux';

// ACTION CREATORS

interface requestDataActionType {
  type: ActionTypes.RequestData;
}

const requestDataAction: () => requestDataActionType = () => {
  return {
    type: ActionTypes.RequestData,
  };
};

interface requestDataSuccessActionType {
  type: ActionTypes.RequestDataSuccess;
  payload: covidData;
}

const requestDataSuccessAction: (
  data: covidData
) => requestDataSuccessActionType = (data) => {
  return {
    type: ActionTypes.RequestDataSuccess,
    payload: data,
  };
};

interface requestDataFailureActionType {
  type: ActionTypes.RequestDataFailure;
  payload: string;
}

const requestDataFailureAction: (
  message: string
) => requestDataFailureActionType = (message) => {
  return {
    type: ActionTypes.RequestDataFailure,
    payload: message,
  };
};

export type AllGraphDataActions =
  | requestDataActionType
  | requestDataSuccessActionType
  | requestDataFailureActionType;

// ASYNC ACTION CREATOR
export const fetchCovidData: ActionCreator<ThunkAction<
  Promise<void>,
  GraphState,
  string,
  AllGraphDataActions
>> = (countryCode: string) => {
  return async (
    dispatch: ThunkDispatch<GraphState, string, AllGraphDataActions>,
    getState: () => GraphState
  ) => {
    dispatch<requestDataActionType>(requestDataAction());
    try {
      const results: {
        data: covidData;
      } = await fetch(
        `https://corona-api.com/countries/${countryCode}`
      ).then((res) => res.json());
      dispatch<requestDataSuccessActionType>(
        requestDataSuccessAction(results.data)
      );
    } catch (err) {
      dispatch<requestDataFailureActionType>(requestDataFailureAction(err));
    }
  };
};
