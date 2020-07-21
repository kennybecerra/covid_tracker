import { combineReducers } from 'redux';
import { graphDataReducer, GraphState } from './graphData';

export interface StoreState {
  graphData: GraphState;
}

const reducers = combineReducers<StoreState>({
  graphData: graphDataReducer,
});

export default reducers;
