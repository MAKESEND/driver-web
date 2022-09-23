import { createTheme } from '@mui/material';

// colors
const white = '#FFF';
const black = '#000';
const lightGrey = '#ccc';
const darkGrey = '#777';
const grey40 = '#BFC2C9';
const grey80 = '#343840';
const pink = '#EDEFF2';

// size
const maxWidth = '34rem';

export const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#FFA500',
    // },
    white: {
      main: white,
    },
    black: {
      main: black,
    },
    lightGrey: {
      main: lightGrey,
    },
    darkGrey: {
      main: darkGrey,
    },
    common: {
      white,
      black,
      lightGrey,
      darkGrey,
      grey40,
      grey80,
      pink,
    },
  },
  typography: {
    h1: {
      fontSize: '1.625rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    h2: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    body1: {
      textAlign: 'center',
    },
    body2: {
      textAlign: 'center',
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          width: '100%',
          maxWidth,
        },
      },
    },
    MuiDivider: {
      defaultProps: {
        sx: { margin: '1rem 0' },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlinedSecondary: {
          color: grey80,
          border: grey40,
          '&:hover': {
            color: grey40,
            border: grey40,
          },
        },
      },
    },
  },
});

export default theme;
