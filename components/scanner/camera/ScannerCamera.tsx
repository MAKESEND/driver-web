import type { ScannerConfig } from 'types';
import type { QrReaderProps } from 'react-qr-reader';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { selectedCameraState } from 'states/scanner';
import { useModal } from 'hooks/useModal';
import { useToast } from 'hooks/useToast';
import { useScannerResult } from 'hooks/useScannerResult';
import { Box, Typography, IconButton } from '@mui/material';

import dynamic from 'next/dynamic';
const HighlightOffIcon = dynamic(
  () => import('@mui/icons-material/HighlightOff')
);
const QrReader = dynamic(() =>
  import('react-qr-reader').then((mod) => mod.QrReader)
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner'),
  { suspense: true }
);

export interface ScannerCameraProps {
  scannerConfig: ScannerConfig;
}

export const ScannerCamera: React.FC<ScannerCameraProps> = ({
  scannerConfig,
}) => {
  const [showToast] = useToast();
  const [showModal] = useModal();
  const { t } = useTranslation(['scanner']);
  const scannedResultRef = useScannerResult();
  const [deviceId] = useRecoilState(selectedCameraState);

  const initRef = useRef(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    setIsScanning(false);

    if (deviceId && initRef.current) {
      // tick because of React 18 batch state update
      timer = setTimeout(() => {
        setIsScanning(true);
      }, 100);
    }

    if (!initRef.current) {
      initRef.current = true;
    }

    return () => clearTimeout(timer);
  }, [deviceId]);

  const toggleScanning = () => setIsScanning((isScanning) => !isScanning);

  const onScannedResult: QrReaderProps['onResult'] = (result, error) => {
    if (result) {
      const text = result.getText();
      const scannedResult = { text, scanned_at: Date.now() };

      if (scannerConfig.mode === 'single') {
        scannedResultRef.current = [scannedResult];
        setIsScanning(false);
      } else if (scannerConfig.mode === 'bulk') {
        showToast(`${t('title.received')} ${text}`);
        scannedResultRef.current = [...scannedResultRef.current, scannedResult];
      }
    }

    // error will be an empty object {}
    // when scanner got nothing during the deply interval (default 0.5s)
    if (error && JSON.stringify(error) !== JSON.stringify({})) {
      showModal({
        modalType: 'ALERT',
        props: {
          title: t('error.scannerError'),
          description: error?.message || t('error.somethingWentWrong'),
        },
      });
    }
  };

  return (
    <Box
      sx={{
        mx: 'auto',
        width: '100%',
        height: '100%',
        maxWidth: '350px',
        maxHeight: '350px',
      }}
    >
      {isScanning ? (
        <QrReader
          videoId="qr-scanner"
          onResult={onScannedResult}
          scanDelay={500} // 0.5s
          constraints={{
            aspectRatio: 1,
            ...(deviceId
              ? { deviceId: { exact: deviceId } }
              : { facingMode: 'environment' }),
          }}
          ViewFinder={() => (
            <IconButton
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
              }}
              onClick={toggleScanning}
            >
              <HighlightOffIcon
                sx={{ color: (theme) => theme.palette.common.white }}
              />
            </IconButton>
          )}
        />
      ) : (
        <>
          <IconButton
            size="large"
            disabled={isScanning}
            aria-label="qr-reader-button"
            onClick={toggleScanning}
            sx={{ width: '100%', height: '100%' }}
          >
            <QrCodeScannerIcon sx={{ width: '100%', height: '100%' }} />
          </IconButton>
          <Typography>{t('title.tapToScan')}</Typography>
        </>
      )}
    </Box>
  );
};

export default ScannerCamera;
