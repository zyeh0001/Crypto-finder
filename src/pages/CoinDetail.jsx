import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CryptoContext from '../context/crypto/CryptoContext';
import { fetchSingleCrypto } from '../context/crypto/CryptoActions';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CoinHistoryChart from '../components/CoinHistoryChart';
import { currencyFormatter } from '../utils/currencyFormatter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Container,
  Paper,
  Button,
  Box,
  Typography,
  Grid,
  Divider,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

function CoinDetail() {
  const { id } = useParams();
  const { crypto, isLoading, dispatch, currency } = useContext(CryptoContext);

  const navigate = useNavigate();

  const getSingleCrypto = async () => {
    const coin = await fetchSingleCrypto(id);
    dispatch({ type: 'GET_CRYPTO_DETAIL', payload: coin });
    console.log(coin);
    return coin;
  };

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    getSingleCrypto();
    //eslint-disable-next-line
  }, [currency]);

  //Refresh crypto data every 5 second
  useEffect(() => {
    const interval = setInterval(() => {
      getSingleCrypto(currency);
    }, 5000);

    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, [currency, crypto]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Button
        variant='outlined'
        sx={{
          mt: 5,
          ml: 5,
          fontWeight: 'bold',
          fontSize: 18,
          mb: { xs: 3, md: 2 },
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosIcon /> Back
      </Button>
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <Paper
          sx={{
            p: 5,
            borderRadius: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'center' },
            }}
          >
            <Box
              sx={{
                height: { xs: 50, md: 100 },
                mx: { xs: 'auto', md: 1 },
              }}
            >
              <img src={crypto.image?.large} alt={crypto.name} height='100%' />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',

                mt: 2,
                mx: { xs: 'auto', md: 1 },
                textAlign: { xs: 'center', md: 'start' },
              }}
            >
              <Typography variant='h4'>{crypto.name} </Typography>
              <Typography variant='h6' sx={{ color: 'darkgrey' }}>
                {crypto.symbol}{' '}
              </Typography>
            </Box>
            <Box sx={{ mx: 'auto', mt: 2 }}>
              <Typography variant='h2' sx={{ fontWeight: 650 }}>
                {currencyFormatter(
                  currency,
                  crypto.market_data?.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </Box>

            <Box sx={{ mx: { xs: 'auto', md: 0 }, mt: { xs: 5, md: 0 } }}>
              <Grid
                container
                sx={{
                  width: 350,
                }}
              >
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    24H Change:
                  </Typography>
                  <Divider
                    color='#03FEEF'
                    sx={{
                      borderBottomWidth: 1,
                      my: 0.5,
                      visibility: { xs: 'hidden', md: 'visible' },
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      color:
                        crypto.market_data?.price_change_24h_in_currency[
                          currency.toLowerCase()
                        ] > 0
                          ? 'green'
                          : 'red',
                      textAlign: { xs: 'left', md: 'center' },
                      fontWeight: 'bold',
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    {currencyFormatter(
                      currency,
                      crypto.market_data?.price_change_24h_in_currency[
                        currency.toLowerCase()
                      ]
                    )}
                  </Typography>
                  <Divider
                    color='#03FEEF'
                    sx={{
                      borderBottomWidth: 1,
                      my: 0.5,
                      visibility: { xs: 'hidden', md: 'visible' },
                    }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Typography
                    sx={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    24H High:
                  </Typography>
                  <Divider
                    color='#03FEEF'
                    sx={{
                      borderBottomWidth: 1,
                      my: 0.5,
                      visibility: { xs: 'hidden', md: 'visible' },
                    }}
                  />
                </Grid>

                <Grid item xs={8}>
                  <Typography
                    sx={{
                      textAlign: { xs: 'left', md: 'center' },
                      fontWeight: 'bold',
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    {currencyFormatter(
                      currency,
                      crypto.market_data?.high_24h[currency.toLowerCase()]
                    )}
                  </Typography>
                  <Divider
                    color='#03FEEF'
                    sx={{
                      borderBottomWidth: 1,
                      my: 0.5,
                      visibility: { xs: 'hidden', md: 'visible' },
                    }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Typography
                    sx={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    24H Low:
                  </Typography>
                  <Divider
                    color='#03FEEF'
                    sx={{
                      borderBottomWidth: 1,
                      my: 0.5,
                      visibility: { xs: 'hidden', md: 'visible' },
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      textAlign: { xs: 'left', md: 'center' },
                      fontWeight: 'bold',
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    {currencyFormatter(
                      currency,
                      crypto.market_data?.low_24h[currency.toLowerCase()]
                    )}
                  </Typography>
                  <Divider
                    color='#03FEEF'
                    sx={{
                      borderBottomWidth: 1,
                      my: 0.5,
                      visibility: { xs: 'hidden', md: 'visible' },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    Total Volume:
                  </Typography>
                  <Divider
                    color='#03FEEF'
                    sx={{
                      borderBottomWidth: 1,
                      my: 0.5,
                      visibility: { xs: 'hidden', md: 'visible' },
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      textAlign: { xs: 'left', md: 'center' },
                      fontWeight: 'bold',
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    {currencyFormatter(
                      currency,
                      crypto.market_data?.total_volume[currency.toLowerCase()]
                    )}
                  </Typography>
                  <Divider
                    color='#03FEEF'
                    sx={{
                      borderBottomWidth: 1,
                      my: 0.5,
                      visibility: { xs: 'hidden', md: 'visible' },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{ mt: 4, justifyContent: { xs: 'center', md: 'start' } }}
          >
            <Chip
              label={`Rank: ${crypto?.coingecko_rank}`}
              color='primary'
              sx={{ fontSize: 12, fontWeight: 'bold' }}
            />

            <Chip
              label={`Developer Score: ${crypto?.developer_score}`}
              color='secondary'
              sx={{ fontSize: 12, fontWeight: 'bold' }}
            />
            <Chip
              label={`Coingeko Score: ${crypto?.coingecko_score}`}
              color='info'
              sx={{ fontSize: 12, fontWeight: 'bold' }}
            />
          </Stack>

          <Box sx={{ mt: 5 }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
                sx={{ backgroundColor: '#2E3333' }}
              >
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: 20 }}
                >{`About ${crypto.name}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant='subtitle1'
                  dangerouslySetInnerHTML={{
                    __html: crypto.description?.en,
                  }}
                ></Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Paper>
        <Divider />
        <Paper
          sx={{
            p: 5,
            borderRadius: 5,
          }}
        >
          <CoinHistoryChart coin={crypto} />
        </Paper>
      </Container>
    </>
  );
}

export default CoinDetail;
