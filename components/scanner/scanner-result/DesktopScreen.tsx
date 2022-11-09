import type { ScannerConfig } from 'types';
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { useScannerResult } from 'hooks/useScannerResult';
import { Button } from '@mui/material';

export interface DesktopScreenProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  scannerConfig: ScannerConfig | null;
}

export const DesktopScreen: React.FC<DesktopScreenProps> = ({
  open = false,
  setOpen = () => console.warn('no setOpen given ScannerResult'),
  scannerConfig = null,
}) => {
  const { t } = useTranslation(['scanner']);
  const scannedResultRef = useScannerResult();

  const onClick = useCallback(() => {
    // TODO: open modal with scanned result
    // custom modal for single mode
    // custom modal for multiple mode
    console.log('open modal');
    console.log(scannedResultRef.current);
  }, [scannedResultRef]);

  useEffect(() => {
    if (open) {
      onClick();
    }
  }, [open, onClick]);

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
