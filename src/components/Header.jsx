import React, { useContext, useState, useEffect } from 'react';
import CryptoContext from '../context/crypto/CryptoContext';
import { useNavigate } from 'react-router-dom';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function Header() {
  const [dollarType, setDollarType] = useState('AUD');
  const { currency, dispatch } = useContext(CryptoContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'SET_CURRENCY', payload: dollarType });
    // console.log(currency);
  }, [dollarType, dispatch, currency]);

  const handleChange = (e) => {
    setDollarType(e.target.value);
  };

  return (
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
  );
}

export default Header;
