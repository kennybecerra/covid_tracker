import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import {
  fetchCountryCovidData,
  fetchCountriesCovidData,
} from './actions/graphData';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch<any>(fetchCountryCovidData('US'));
store.dispatch<any>(fetchCountriesCovidData());
export default store;
