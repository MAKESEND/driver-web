import { useTranslation } from 'next-i18next';
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
  hideText?: boolean;
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  CircularProps,
  BoxProps,
  TypographyProps,
  hideText = false,
  text,
}) => {
  const { t } = useTranslation(['common']);

  return (
    <Box sx={{ textAlign: 'center' }} {...BoxProps}>
      <CircularProgress {...CircularProps} />
      {!hideText && (
        <Typography color="primary" {...TypographyProps}>
          {text || `${t('hint.loading')}...`}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
