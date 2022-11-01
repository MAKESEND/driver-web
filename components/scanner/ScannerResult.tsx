import type { ScannedResult, ScannerConfig } from 'types';
import { useTranslation } from 'next-i18next';
import useTouchScreen from 'hooks/useTouchScreen';
import { Button } from '@mui/material';

import dynamic from 'next/dynamic';
const TouchScreen = dynamic(
  () => import('components/scanner/scanner-result/TouchScreen')
);

export interface ScannerResultProps {
  scannerConfig: ScannerConfig;
  scannedResult?: ScannedResult[];
}

export const ScannerResult: React.FC<ScannerResultProps> = ({
  scannerConfig,
  scannedResult = [],
}) => {
  const isTouchScreen = useTouchScreen();
  const { t } = useTranslation(['scanner']);

  if (isTouchScreen)
    return (
      <TouchScreen
        scannerConfig={scannerConfig}
        scannedResult={scannedResult}
      />
    );

  return (
    <Button
      variant="contained"
      disabled={!scannedResult.length}
      sx={{
        margin: '0 auto',
        width: '100%',
        maxWidth: (theme) => theme.layout.size.btnMaxWidth,
        my: 2,
      }}
    >
      {t('btn.result')}
    </Button>
  );
};

export default ScannerResult;
