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

  interface CommonColors {
    white: string;
    black: string;
    lightGrey: string;
    darkGrey: string;
    grey40: string;
    grey80: string;
    blue50: string;
    pink: string;
    secondary: string;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    secondary: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    secondary: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    secondary: true;
  }
}
