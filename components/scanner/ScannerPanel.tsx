import type { ScannerMode, ScannerType, ScannedResult } from 'types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import SideDrawer from 'components/common/SideDrawer';
import ScannerResultSingle from './single/ScannerResultSingle';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import dynamic from 'next/dynamic';
const Scanner = dynamic(() => import('./Scanner'), { ssr: false });
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

export interface ScannerPanelProps {
  mode?: keyof typeof ScannerMode;
  type?: keyof typeof ScannerType;
}

export const ScannerPanel: React.FC<ScannerPanelProps> = ({
  mode = 'single',
  type,
}) => {
  const isSingleMode = mode === 'single';

  const router = useRouter();
  const { t } = useTranslation(['scanner', 'common']);

  const [isDenied, setIsDenied] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [scannedResult, setScannedResult] = useState<ScannedResult | null>(
    null
  );

  useEffect(() => {
    if (scannedResult) {
      setOpenDrawer(true);
      if (isSingleMode) {
        setIsScanning(false);
      }
    }
  }, [scannedResult, isSingleMode]);

  return (
    <>
      <Scanner
        isScanning={isScanning}
        setIsScanning={setIsScanning}
        setIsDenied={setIsDenied}
        setScannedResult={setScannedResult}
      />
      <SideDrawer open={openDrawer} setOpen={setOpenDrawer}>
        {/* TODO render scanned result for bulk mode */}
        {isSingleMode ? (
          <ScannerResultSingle scannedResult={scannedResult} type={type} />
        ) : null}
      </SideDrawer>
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isDenied ? (
          <Box>
            <Typography variant="body1">{t('title.cameraDenied')}</Typography>
            <Button onClick={() => router.reload()}>{t('btn.reload')}</Button>
          </Box>
        ) : (
          <>
            <IconButton
              size="large"
              disabled={isScanning}
              aria-label="qr-reader-button"
              onClick={() => {
                setIsScanning((oldVal) => !oldVal);
              }}
              sx={{
                width: '100%',
                height: '100%',
                maxWidth: '350px',
                maxHeight: '350px',
              }}
            >
              <QrCodeScannerIcon sx={{ width: '100%', height: '100%' }} />
            </IconButton>
            <Typography>{t('title.tapToScan')}</Typography>
          </>
        )}
      </Stack>
    </>
  );
};

export default ScannerPanel;
