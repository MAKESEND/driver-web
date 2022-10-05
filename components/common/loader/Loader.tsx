import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
  Typography,
  TypographyProps,
} from '@mui/material';

export interface LoaderProps {
  CircularProps?: CircularProgressProps;
  BoxProps?: BoxProps;
  TypographyProps?: TypographyProps;
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
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
