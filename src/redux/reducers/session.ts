import { AllSessionActions } from '../actions/session';
import { ActionTypes } from '../actions/actionTypes';

export interface SessionState {
  currentSlide: number;
  firstTimeFlag: boolean;
}

const initialState = {
  currentSlide: 0,
  firstTimeFlag: true,
};

export const sessionReducer = (
  state: SessionState = initialState,
  action: AllSessionActions
) => {
  let newState = { ...state };
  switch (action.type) {
    case ActionTypes.MoveSlide:
      newState.currentSlide = action.payload;
      break;
    case ActionTypes.UnsetFirstTime:
      newState.firstTimeFlag = false;
      break;
    default:
      break;
  }

  return newState;
};
