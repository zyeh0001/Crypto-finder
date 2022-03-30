import React, { createContext, useReducer } from 'react';
import cryptoReducer from './CryptoReducer';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const initialState = {
    currency: 'AUD',
    cryptos: [],
    crypto: {},
    details: {},
    isLoading: false,
  };

  const [state, dispatch] = useReducer(cryptoReducer, initialState);

  return (
    <CryptoContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
