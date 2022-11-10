import { createTheme } from '@mui/material';

// colors
const blue50 = '#488FEF';
const black = '#000';
const lightGrey = '#ccc';
const darkGrey = '#777';
const grey40 = '#BFC2C9';
const grey80 = '#343840';
const white = '#FFF';
const pink = '#EDEFF2';
const secondary = 'rgba(0,0,0,0.6)';
const yellow50 = '#ECB424';
const orange50 = '#FFA500';

// size
const btnMaxWidth = 360;
const portMaxWidth = 544;

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
      black,
      blue50,
      lightGrey,
      darkGrey,
      grey40,
      grey80,
      pink,
      secondary,
      white,
      yellow50,
      orange50,
    },
  },
  layout: {
    size: {
      btnMaxWidth,
      portMaxWidth,
      drawerBreakpoint: 900,
      drawerWidth: 300,
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
    secondary: {
      color: secondary,
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          width: '100%',
          portMaxWidth,
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
        root: {
          padding: '0.5rem 0',
          fontSize: '0.875rem',
        },
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
