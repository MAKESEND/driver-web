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
  loadingText?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  CircularProps,
  BoxProps,
  TypographyProps,
  loadingText,
}) => {
  return (
    <Box sx={{ textAlign: 'center' }} {...BoxProps}>
      <CircularProgress {...CircularProps} />
      {loadingText && (
        <Typography color="primary" {...TypographyProps}>
          {loadingText}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
