import { ActionTypes } from './actionTypes';

export const moveSlideTo = (newSlideIndex: number) => {
  return {
    type: ActionTypes.MoveSlide,
    payload: newSlideIndex,
  } as const;
};

export const unsetFirstTimeFlag = () => {
  return {
    type: ActionTypes.UnsetFirstTime,
  } as const;
};
export type AllSessionActions =
  | ReturnType<typeof moveSlideTo>
  | ReturnType<typeof unsetFirstTimeFlag>;
