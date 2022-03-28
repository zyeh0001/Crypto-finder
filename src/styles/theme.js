import { createTheme } from '@mui/material';

const baseTheme = createTheme({
  //   typography: {
  //     allVariants: {
  //       fontFamily: 'Roboto, sans-serif',
  //     },
  //   },
  palette: {
    primary: {
      main: '#ECB800',
    },
    secondary: {
      main: '#FFC700',
    },
  },
  shape: {
    borderRadius: 4,
  },
});
export default baseTheme;
