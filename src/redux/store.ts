import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { fetchCovidData } from './actions/graphData';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Workaround, need to figure out what the issue is with the types
store.dispatch<any>(fetchCovidData('US'));
export default store;
