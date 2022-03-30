const cryptoReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CRYPTOS':
      return { ...state, cryptos: action.payload, isLoading: false };
    case 'GET_CRYPTO_DETAIL':
      return {
        ...state,
        crypto: action.payload,
        isLoading: false,
      };
    case 'GET_GRAPH_DETAIL':
      return {
        ...state,
        details: action.payload,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: true };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'CLEAR_CRYPTOS':
      return { ...state, cryptos: [], isLoading: false };
    default:
      return state;
  }
};

export default cryptoReducer;
