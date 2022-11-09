import type { Theme, ThemeOptions } from '@mui/material/styles';
import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    white?: PaletteColorOptions;
    black?: PaletteColorOptions;
    lightGrey?: PaletteColorOptions;
    darkGrey?: PaletteColorOptions;
    layout?: Layout;
  }

  interface Palette {
    white: PaletteColor;
    black: PaletteColor;
    lightGrey: PaletteColor;
    darkGrey: PaletteColor;
    layout: Layout;
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
    yellow50: string;
    orange50: string;
  }
}

enum layoutComponents {
  btnMaxWidth = 'btnMaxWidth',
  portMaxWidth = 'portMaxWidth',
  drawerBreakpoint = 'drawerBreakpoint',
  drawerWidth = 'drawerWidth',
}

declare module '@mui/material/styles' {
  interface Theme {
    layout: {
      size: {
        [key in layoutComponents]: number;
      };
    };
  }

  interface ThemeOptions {
    layout: {
      size?: {
        [key in layoutComponents]: number;
      };
    };
  }

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
