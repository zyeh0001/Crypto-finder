import { createTheme } from '@mui/material';

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#03FEEF',
    },
    secondary: {
      main: '#FFCA0C',
    },
    text: {
      primary: '#fff',
      secondary: '#03FEEF',
    },
    mode: 'dark',
  },

  shape: {
    borderRadius: 4,
  },
});
export default baseTheme;
