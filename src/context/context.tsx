import * as React from 'react';
import { useReducer, useContext } from 'react';
import { Component } from 'react';

const REQUEST_DATA = 'REQUEST_DATA';
const REQUEST_DATA_SUCESS = 'REQUEST_DATA_SUCESS';
const REQUEST_DATA_FAILURE = 'REQUEST_DATA_FAILURE';

const initialState = {
  loading: false,
  errorMessage: '',
  data: {},
};

const reducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case REQUEST_DATA:
      newState.loading = true;
      break;
    case REQUEST_DATA_SUCESS:
      newState.loading = false;
      newState.data = action.data;
      break;
    case REQUEST_DATA_FAILURE:
      newState.loading = false;
      newState.errorMessage = action.errorMessage;
      break;
    default:
      console.log('Nothing happened');
      break;
  }

  return newState;
};

const DataContext = React.createContext(undefined);
DataContext.displayName = 'Covid Data';

interface IProps {}
const Context: React.FC<IProps> = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider
      value={{
        store,
        dispatch,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, Context };
