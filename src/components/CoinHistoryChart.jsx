import React, { useState, useContext, useEffect } from 'react';
import CryptoContext from '../context/crypto/CryptoContext';
import { fetchCryptoGraph } from '../context/crypto/CryptoActions';
import {
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from '@mui/material';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';
import { Box } from '@mui/system';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

function CoinHistoryChart({ coin }) {
  const { currency, details, dispatch } = useContext(CryptoContext);
  const [days, setDays] = useState(1);
  const [alignment, setAlignment] = useState(1);
  const getCryptoGraph = async () => {
    const graph = await fetchCryptoGraph(coin?.id, days, currency);
    dispatch({ type: 'GET_GRAPH_DETAIL', payload: graph });
    console.log(graph);
    return graph;
  };

  useEffect(() => {
    coin?.id && getCryptoGraph();
    //eslint-disable-next-line
  }, [currency, days]);

  const getGraphData = () => {
    const labels = details.prices?.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    });

    const datasets = [
      {
        data: details.prices?.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: '#03FEEF',
      },
    ];
    return { labels, datasets };
  };

  const getBarData = () => {
    const labels = details.total_volumes?.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    });

    const datasets = [
      {
        data: details.total_volumes?.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        backgroundColor: '#FFCA0C',
      },
    ];
    return { labels, datasets };
  };

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);

    setDays(e.target.value);

    // const currentTime = new Date().getTime();
    // const hourLater = currentTime + 3600;
    // console.log(currentTime, hourLater);
  };

  return (
    <div>
      {Object.entries(details).length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress
            style={{
              color: 'primary',
            }}
            size={200}
            thickness={1}
          />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <ToggleButtonGroup
              color='primary'
              exclusive
              value={alignment}
              onChange={handleChange}
            >
              <ToggleButton value={1}>1D</ToggleButton>
              <ToggleButton value={7}>1W</ToggleButton>
              <ToggleButton value={30}>1M</ToggleButton>
              <ToggleButton value={365}>1Y</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Line
            data={getGraphData()}
            options={{
              responsive: true,
              elements: {
                point: {
                  radius: 1,
                },
              },
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Price Historical Line',
                },
              },
            }}
          />
          <Divider color='#fff' sx={{ borderBottomWidth: 1, my: 5 }} />

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <ToggleButtonGroup
              color='secondary'
              exclusive
              value={alignment}
              onChange={handleChange}
            >
              <ToggleButton value={1}>1D</ToggleButton>
              <ToggleButton value={7}>1W</ToggleButton>
              <ToggleButton value={30}>1M</ToggleButton>
              <ToggleButton value={365}>1Y</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Bar
            data={getBarData()}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Total volume',
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default CoinHistoryChart;
