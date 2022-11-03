import { useTranslation } from 'next-i18next';
import { useScannerResult } from 'hooks/useScannerResult';
import { Button } from '@mui/material';

export const DesktopScreen: React.FC = () => {
  const { t } = useTranslation(['scanner']);
  const scannedResultRef = useScannerResult();

  const onClick = () => {
    // TODO: open modal with scanned result
    // custom modal for single mode
    // custom modal for multiple mode
    console.log('open modal');
  };

  return (
    <Button
      variant="contained"
      sx={{
        width: '100%',
        mx: 'auto',
        my: 2,
        maxWidth: (theme) => theme.layout.size.btnMaxWidth,
      }}
      onClick={onClick}
    >
      {t('btn.result')}
    </Button>
  );
};
export default DesktopScreen;
