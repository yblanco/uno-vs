import React, { useReducer, createContext } from 'react';

import reducer from './reducer';
import initialState from '../constants/states.constant';

export const Store = createContext();

function reducerFunction(oldState, action) {
  const state = { ...oldState };
  Object.keys(reducer).forEach((item) => {
    state[item] = reducer[item](state[item], action);
  });
  return state;
}

export function Provider(props) {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  );
}
