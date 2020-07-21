import { ActionTypes, covidData } from '../actions/types';

const initialState: GraphState = {
  loading: false,
  error: false,
  errorMessage: '',
  data: undefined,
};

export interface GraphState {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  data: covidData;
}

interface ActionType {
  type: ActionTypes;
  payload?: any;
}

export const graphDataReducer = (
  state: GraphState = initialState,
  action: ActionType
): GraphState => {
  switch (action.type) {
    case ActionTypes.RequestData:
      return {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case ActionTypes.RequestDataSuccess:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
      break;
    case ActionTypes.RequestDataFailure:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
      break;
    default:
      return { ...state };
      break;
  }
};
