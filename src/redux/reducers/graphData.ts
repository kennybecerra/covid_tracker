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
  let newState = { ...state };

  switch (action.type) {
    case ActionTypes.RequestData:
      newState.loading = true;
      newState.error = false;
      break;
    case ActionTypes.RequestDataSuccess:
      newState.loading = false;
      newState.error = false;
      newState.data = action.payload;
      break;
    case ActionTypes.RequestDataFailure:
      newState.loading = false;
      newState.error = true;
      newState.errorMessage = action.payload;
      break;
    default:
      break;
  }

  return newState;
};
