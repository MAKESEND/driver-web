import type { FC } from 'react';
// import type { SxProps } from '@mui/material';
import {
  // Box as MuiBox,
  Box,
  BoxProps,
  // CircularProgress as MuiCircularProgress,
  CircularProgress,
  CircularProgressProps,
  // Typography as MuiTypography,
  Typography,
  TypographyProps,
} from '@mui/material';

export interface LoaderProps {
  CircularProps?: CircularProgressProps;
  BoxProps?: BoxProps;
  TypographyProps?: TypographyProps;
  text?: string;
}

export const Loader: FC<LoaderProps> = ({
  CircularProps,
  BoxProps,
  TypographyProps,
  text = 'Loading',
}) => {
  return (
    <Box sx={{ textAlign: 'center' }} {...BoxProps}>
      <CircularProgress {...CircularProps} />
      <Typography color="primary" {...TypographyProps}>
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
