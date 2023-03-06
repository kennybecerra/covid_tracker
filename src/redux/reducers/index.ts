import { combineReducers } from 'redux';
import { graphDataReducer, GraphState } from './graphData';
import { sessionReducer, SessionState } from './session';

export interface StoreState {
  graphData: GraphState;
  session: SessionState;
}

const reducers = combineReducers<StoreState>({
  graphData: graphDataReducer,
  session: sessionReducer,
});

export default reducers;
