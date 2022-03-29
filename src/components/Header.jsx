import React, { useContext, useState, useEffect } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
  Select,
  MenuItem,
} from '@mui/material';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import CryptoContext from '../context/crypto/CryptoContext';

function Header() {
  const [dollarType, setDollarType] = useState('AUD');

  const { currency, dispatch } = useContext(CryptoContext);

  const handleChange = (e) => {
    setDollarType(e.target.value);
    // dispatch({ type: 'SET_CURRENCY', payload: e.target.value });
  };

  useEffect(() => {
    dispatch({ type: 'SET_CURRENCY', payload: dollarType });
    // console.log(currency);
  }, [dollarType, dispatch, currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#03FEEF',
      },
      text: {
        primary: '#fff',
      },
      mode: 'dark',
    },
  });

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar>
              <PaidOutlinedIcon
                fontSize='medium'
                sx={{ mr: 1 }}
                color='primary'
              />
              <Typography
                variant='h5'
                color='primary'
                style={{ cursor: 'pointer', fontWeight: 'bolder' }}
                onClick={() => navigate('/')}
              >
                Crypto Finder
              </Typography>

              <Box sx={{ minWidth: 120, ml: 'auto', py: 2 }}>
                <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-standard-label'>
                    Currency
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={dollarType}
                    onChange={handleChange}
                    label='currency'
                  >
                    <MenuItem value={'AUD'}>AUD</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'TWD'}>TWD</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
