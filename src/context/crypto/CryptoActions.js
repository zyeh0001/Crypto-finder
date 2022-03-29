import React, { useContext } from 'react';
import axios from 'axios';
import { CryptoList, SingleCrypto, HistoricalChart } from '../../config/api';
import CryptoContext from './CryptoContext';

// const header = {
//   Authorization: `token ${CoinGecko_TOKEN}`,
// };

//fetch all cryptos
export const fetchCryptos = async (currency) => {
  const response = await axios.get(CryptoList(currency));
  return response.data;
};
