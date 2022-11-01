import type { ScannedResult, ScannerMode, ScannerType } from 'types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import useTouchScreen from 'hooks/useTouchScreen';
import ScannerResultSingle from 'components/scanner/scanner-result/single/ScannerResultSingle';
import { Button } from '@mui/material';

import dynamic from 'next/dynamic';
const SideDrawer = dynamic(() => import('components/common/SideDrawer'));

export interface ScannerResultProps {
  scannerConfig: {
    mode: keyof typeof ScannerMode;
    type: keyof typeof ScannerType | undefined;
  };
  scannedResult?: ScannedResult | null;
}

export const ScannerResult: React.FC<ScannerResultProps> = ({
  scannerConfig,
  scannedResult = null,
}) => {
  const isSingleMode = scannerConfig.mode === 'single';
  const isTouchScreen = useTouchScreen();
  const { t } = useTranslation(['scanner']);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (scannedResult) {
      setOpenDrawer(true);
    }
  }, [scannedResult]);

  return (
    <SideDrawer open={openDrawer} setOpen={setOpenDrawer}>
      {/* TODO render scanned result for bulk mode */}
      {isSingleMode ? (
        <ScannerResultSingle
          scannedResult={scannedResult}
          type={scannerConfig?.type}
        />
      ) : null}
      {!isTouchScreen && Boolean(scannedResult) && (
        <Button
          variant="contained"
          disabled={!scannedResult}
          sx={{
            margin: '0 auto',
            width: '100%',
            maxWidth: (theme) => theme.layout.size.btnMaxWidth,
            my: 2,
          }}
        >
          {t('btn.result')}
        </Button>
      )}
    </SideDrawer>
  );
};

export default ScannerResult;
