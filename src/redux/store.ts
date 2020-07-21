import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import rootReducer, { StoreState } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { fetchData, AllActions } from './actions/graphData';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Workaround, need to figure out what the issue is with the types
store.dispatch<any>(fetchData('US'));
export default store;
