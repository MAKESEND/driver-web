import type { SxProps } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import { Button } from '@mui/material';

export interface CollectlistBottomNavProps {
  onConfirm?: () => void;
  countSelected?: number;
  countTotal?: number;
  sx?: SxProps;
  btnSx?: SxProps;
}

export const CollectlistBottomNav: React.FC<CollectlistBottomNavProps> = ({
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
        onClick={() => onConfirm()}
        sx={{
          width: '100%',
          maxWidth: (t) => t.spacing(40),
          ...btnSx,
        }}
      >
        {`${t('btn.confirm')} (${countSelected}/${countTotal})`}
      </Button>
    </MobileContainer>
  );
};

export default CollectlistBottomNav;
