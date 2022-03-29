import {
  Container,
  Typography,
  Divider,
  createTheme,
  ThemeProvider,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  TableBody,
  TablePagination,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { fetchCryptos } from '../context/crypto/CryptoActions';
import CryptoContext from '../context/crypto/CryptoContext';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { currencyFormatter } from '../styles/util';

const headCells = [
  {
    id: 'market_cap_rank',
    numeric: false,
    label: 'Crypto Rank',
  },
  {
    id: 'current_price',
    numeric: true,
    label: 'Price',
  },
  {
    id: 'price_change_percentage_24h',
    numeric: true,
    label: '24h',
  },
  {
    id: 'total_volume',
    numeric: true,
    label: 'Volume',
  },
  {
    id: 'market_cap',
    numeric: true,
    label: 'Mkt Cap',
  },
];

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function CryptoTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontSize: 20, fontWeight: 'bold', color: 'primary' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function CryptoTable() {
  const { cryptos, isLoading, dispatch, currency } = useContext(CryptoContext);
  const [searchText, setSearchText] = useState('');

  //Handle sorting and paging
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('current_price');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const navigate = useNavigate();

  //Get cryptos from api
  const getCryptos = async (currency) => {
    const cryptos = await fetchCryptos(currency);
    dispatch({ type: 'GET_CRYPTOS', payload: cryptos });
    // console.log(cryptos);
    return cryptos;
  };

  //Fetch crypto data when loading page
  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    getCryptos(currency);
    //eslint-disable-next-line
  }, [currency]);

  //Refresh crypto data every 5 second
  useEffect(() => {
    const interval = setInterval(() => {
      getCryptos(currency);
    }, 5000);
    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, [currency, cryptos]);

  const handleSearch = () => {
    if (searchText === '') {
      return cryptos;
    }
    const searchFilter = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchText.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchText.toLowerCase())
    );
    return searchFilter;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cryptos.length) : 0;

  return (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant='h3' sx={{ mb: 5, mt: 10, fontWeight: 'bold' }}>
        Cryptocurrency Price by Market Cap
      </Typography>
      <Divider
        variant='middle'
        color='#03FEEF'
        sx={{ borderBottomWidth: 4, mb: 5 }}
      />
      <TextField
        label='Search for crypto...'
        variant='outlined'
        color='secondary'
        sx={{ width: '100%' }}
        onChange={(e) => setSearchText(e.target.value)}
      ></TextField>

      <TableContainer>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Table
            sx={{
              mt: 3,
              minWidth: 750,
            }}
          >
            <CryptoTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={cryptos.length}
            />
            <TableBody>
              {stableSort(handleSearch(), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => {
                        navigate(`/coins/${row.id}`);
                      }}
                      key={row.name}
                      role='checkbox'
                      tabIndex={-1}
                      sx={{
                        '&.MuiTableRow-root:hover': {
                          backgroundColor: '#0B3333',
                        },
                      }}
                      hover
                    >
                      <TableCell component='th' scope='row'>
                        <Box sx={{ display: 'flex' }}>
                          <img
                            src={row?.image}
                            alt={row.name}
                            height='50'
                            sx={{ mb: 10 }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              pl: 1,
                              ml: 1,
                            }}
                          >
                            <Typography
                              variant='h6'
                              style={{ textTransform: 'uppercase' }}
                            >
                              {row.symbol}
                            </Typography>
                            <Typography
                              variant='body1'
                              style={{ color: 'darkgrey' }}
                            >
                              {row.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell align='right' sx={{ fontSize: 18 }}>
                        {currencyFormatter(
                          currency,
                          row.current_price.toFixed(2)
                        )}
                      </TableCell>
                      <TableCell
                        align='right'
                        sx={{
                          color: profit > 0 ? 'green' : 'red',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}
                      >
                        {`${
                          profit ? '+' : ''
                        }${row.price_change_percentage_24h.toFixed(2)}%`}
                      </TableCell>
                      <TableCell align='right' sx={{ fontSize: 18 }}>
                        {currencyFormatter(currency, row.total_volume)}
                      </TableCell>
                      <TableCell align='right' sx={{ fontSize: 18 }}>
                        {`${currencyFormatter(
                          currency,
                          row.market_cap.toString().slice(0, -6)
                        )} M`}
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        {/* <TestTable /> */}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={handleSearch().length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default CryptoTable;
