import React, { useState, useContext, useEffect } from 'react';
import CryptoContext from '../context/crypto/CryptoContext';
import { fetchCryptoGraph } from '../context/crypto/CryptoActions';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Box,
} from '@mui/material';
Chart.register(...registerables);

function CoinHistoryChart({ coin }) {
  const { currency, details, dispatch } = useContext(CryptoContext);

  //State handle days filter with toggle button
  const [days, setDays] = useState(1);
  const [alignment, setAlignment] = useState(1);

  //get graph data through api
  const getCryptoGraph = async () => {
    const graph = await fetchCryptoGraph(coin?.id, days, currency);
    dispatch({ type: 'GET_GRAPH_DETAIL', payload: graph });
    return graph;
  };

  useEffect(() => {
    coin?.id && getCryptoGraph();
    //eslint-disable-next-line
  }, [currency, days]);

  //prepare data for Line graph
  const getGraphData = () => {
    //prepare x-axis labels
    const labels = details.prices?.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    });

    //prepare data
    const datasets = [
      {
        data: details.prices?.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: '#03FEEF',
      },
    ];
    return { labels, datasets };
  };

  //prepare bar chart data
  const getBarData = () => {
    //change bar chart color according to trend
    const changeBackground = ['#039D00'];
    for (let i = 1; i < details.total_volumes?.length; i++) {
      if (details.total_volumes[i][1] > details.total_volumes[i - 1][1]) {
        changeBackground.push('#BE0000');
      } else {
        changeBackground.push('#039D00');
      }
    }

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
        label: `Volume ( Past ${days} Days ) in ${currency}`,
        backgroundColor: changeBackground,
      },
    ];
    return { labels, datasets };
  };

  //prepare lowest and highest price to be shown on Line graph
  const getHighestLowest = () => {
    const data = details.prices?.map((coin) => coin[1]);
    const maxVal = Math.max(...data).toFixed(2);
    // setHighestPoint(maxVal);
    const minVal = Math.min(...data).toFixed(2);

    return [
      `Price Historical Line:`,
      '',
      `Highest: ${maxVal} | Lowest: ${minVal}`,
    ];
  };

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
    setDays(e.target.value);
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
                  text: getHighestLowest(),
                  color: 'white',
                  font: { size: 20 },
                  padding: { bottom: 20 },
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
              borderRadius: 5,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Total volume',
                  color: 'white',
                  font: { size: 20 },
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
