import { ActionTypes, covidData } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { GraphState } from '../reducers/graphData';
import { AnyAction } from 'redux';

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

export type AllActions =
  | requestDataActionType
  | requestDataSuccessActionType
  | requestDataFailureActionType
  | AnyAction;

export const fetchData = (
  countryCode: string
): ThunkAction<Promise<void>, GraphState, {}, AllActions> => {
  return async (
    dispatch: ThunkDispatch<GraphState, {}, AllActions>,
    getState
  ): Promise<void> => {
    dispatch(requestDataAction());
    try {
      const results: {
        data: covidData;
      } = await fetch(
        `https://corona-api.com/countries/${countryCode}`
      ).then((res) => res.json());
      dispatch(requestDataSuccessAction(results.data));
    } catch (err) {
      dispatch(requestDataFailureAction(err));
    }
  };
};
