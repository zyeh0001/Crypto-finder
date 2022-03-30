import axios from 'axios';
import { CryptoList, SingleCrypto, HistoricalChart } from '../../config/api';

// const header = {
//   Authorization: `token ${CoinGecko_TOKEN}`,
// };

//fetch all cryptos
export const fetchCryptos = async (currency) => {
  const response = await axios.get(CryptoList(currency));
  return response.data;
};

//fetch one crypto
export const fetchSingleCrypto = async (id) => {
  const response = await axios.get(SingleCrypto(id));
  return response.data;
};

//fetch crypto historical data
export const fetchCryptoGraph = async (id, days, currency) => {
  const response = await axios.get(HistoricalChart(id, days, currency));
  return response.data;
};
