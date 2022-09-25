import type { SxProps } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';

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
    <MobileContainer
      sx={{
        position: 'absolute',
        bottom: 0,
        marginBottom: (t) => t.spacing(2),
        ...sx,
      }}
    >
      <Button
        variant="contained"
        disabled={disabled}
        onClick={() => onConfirm()}
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
    </MobileContainer>
  );
};

export default CollectlistBottomNav;
