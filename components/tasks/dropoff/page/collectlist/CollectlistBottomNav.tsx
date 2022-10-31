import type { SxProps } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button } from '@mui/material';

export interface CollectlistBottomNavProps {
  disabled?: boolean;
  isLoading?: boolean;
  onConfirm?: () => void;
  countSelected?: number;
  countTotal?: number;
  sx?: SxProps;
  btnSx?: SxProps;
}

export const CollectlistBottomNav: React.FC<CollectlistBottomNavProps> = ({
  disabled = false,
  isLoading = false,
  onConfirm = () => console.warn('no function given to CollectlistBottomNav'),
  countSelected = 0,
  countTotal = 0,
  sx,
  btnSx,
}) => {
  const { t } = useTranslation('tasks');

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        mb: 2,
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: (theme) => theme.layout.size.portMaxWidth,
        ...sx,
      }}
    >
      <Button
        variant="contained"
        disabled={disabled}
        onClick={onConfirm}
        sx={{
          width: '100%',
          maxWidth: { xs: '80vw', sm: '20rem' },
          ...btnSx,
        }}
      >
        {t('btn.confirm')}&nbsp;
        {isLoading ? (
          <CircularProgress color="inherit" size={14} />
        ) : (
          `(${countSelected}/${countTotal})`
        )}
      </Button>
    </Box>
  );
};

export default CollectlistBottomNav;
