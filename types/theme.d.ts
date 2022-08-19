import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    white?: PaletteColorOptions;
    black?: PaletteColorOptions;
    lightGrey?: PaletteColorOptions;
    darkGrey?: PaletteColorOptions;
  }
  interface Palette {
    white: PaletteColor;
    black: PaletteColor;
    lightGrey: PaletteColor;
    darkGrey: PaletteColor;
  }
}
