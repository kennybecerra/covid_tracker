import { type Action } from "redux";

export const createActionTypeHelper = <T extends string>(action: T) => {
	return {
		RequestData: `${action}_REQUEST`,
		RequestDataSuccess: `${action}_SUCCESS`,
		RequestDataFailure: `${action}_FAILURE`
	} as const
}


export const createDataActionsHelper = <SuccessData, FailureMessage extends string, ActionTypes extends ReturnType<typeof createActionTypeHelper>>(actionTypes: ActionTypes ) => {


	return {
		requestDataAction: () => ({type: actionTypes.RequestData} as Action<typeof actionTypes["RequestData"]>),
		requestDataSuccessAction: (data: SuccessData) => ({type: actionTypes.RequestDataSuccess, payload: data } as SuccessAction<SuccessData, typeof actionTypes["RequestDataSuccess"]>),
		requestDataFailureAction: (message: FailureMessage) => ({payload: message, type: actionTypes.RequestDataFailure} as FailureAction<FailureMessage, typeof actionTypes["RequestDataFailure"]>)
	}

}


export type SuccessAction<P, A > = {
    payload: P
} & Action<A>;

export type FailureAction<P extends string, A> = {
	payload: P
} & Action<A>