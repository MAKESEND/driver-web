import type { ScannerConfig } from 'types';
import type { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useMemo, useRef, memo, useCallback } from 'react';
import { useWindowSize } from 'react-use';
import { useTranslation } from 'next-i18next';
import { isMobile } from 'react-device-detect';
import { camerasState, selectedCameraState } from 'states';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useScannerResult } from 'hooks/useScannerResult';
import initScanner from 'utils/scanner/initScanner';
import startScanner from 'utils/scanner/startScanner';
import stopScanner from 'utils/scanner/stopScanner';
import cameraConfig from 'utils/scanner/cameraConfig';
import Loader from 'components/common/loader/Loader';
import ScannerTitle from 'components/_scanner/camera/ScannerTitle';
import { Box, Backdrop, IconButton, styled } from '@mui/material';

import dynamic from 'next/dynamic';
const CancelIcon = dynamic(() => import('@mui/icons-material/Cancel'));
const ScannerOptions = dynamic(
  () => import('components/_scanner/camera/ScannerOptions')
);

const ButtonWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'minWidth' && prop !== 'isMobile',
})<{ minWidth?: number; isMobile?: boolean }>(
  ({ theme, minWidth, isMobile = true }) => ({
    position: 'absolute',
    bottom: 45,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: theme.zIndex.drawer + 2,
    width: isMobile
      ? 300
      : `calc(${minWidth ? `${minWidth}px` : '100%'} * (2 / 3))`,
    maxWidth: '500px',
    padding: '1.5rem 0',
    display: 'flex',
    justifyContent: 'center',
  })
);

export interface ScannerProps {
  isScanning?: boolean;
  setIsScanning?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDenied?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenResult?: React.Dispatch<React.SetStateAction<boolean>>;
  scannerConfig?: ScannerConfig;
}

export const Scanner: React.FC<ScannerProps> = ({
  isScanning = false,
  setIsScanning = () => console.warn('no setIsScanning given to Scanner'),
  setIsDenied = () => console.warn('no setIsDenied given to Scanner'),
  setOpenResult = () => console.warn('no setOpenResult given to Scanner'),
  scannerConfig = null,
}) => {
  // const scannerTask = scannerConfig?.task || 'scan';
  const scannerMode = scannerConfig?.mode || 'single';

  const { width, height } = useWindowSize();
  const scannedResultRef = useScannerResult();
  const { t } = useTranslation(['scanner', 'common']);

  const hasStartedRef = useRef<boolean>(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const setCameras = useSetRecoilState(camerasState);
  const selectedCamera = useRecoilValue(selectedCameraState);

  const minSide = useMemo(() => Math.min(width, height), [width, height]);
  const camConfig = useMemo(
    () => cameraConfig({ width, height, isMobile }),
    [width, height]
  );

  const onSuccessCallback = useCallback(
    (decodedText: string) => {
      if (scannerMode === 'single') {
        scannedResultRef.current = [
          {
            text: decodedText,
            scanned_at: Date.now(),
          },
        ];

        setOpenResult(true);
        setIsScanning(false);
        stopScanner(scannerRef.current);
        scannerRef.current = null;
        hasStartedRef.current = false;
      } else if (scannerMode === 'bulk') {
        const cache = [...scannedResultRef.current];

        scannedResultRef.current = [
          ...cache,
          {
            text: decodedText,
            scanned_at: Date.now(),
          },
        ];
      }
    },
    [scannerMode, scannedResultRef, setIsScanning, setOpenResult]
  );

  useEffect(() => {
    // init scanner with camera
    if (isScanning && !hasStartedRef.current) {
      initScanner({
        cameraId: selectedCamera,
        camConfig,
        scannerRef,
        setIsDenied,
        setIsScanning,
        setCameras,
        onSuccessCallback,
      }).then((hasStarted) => {
        hasStartedRef.current = hasStarted;
      });
    }
  }, [
    isScanning,
    onSuccessCallback,
    camConfig,
    selectedCamera,
    scannedResultRef,
    scannerMode,
    setIsDenied,
    setIsScanning,
    setCameras,
  ]);

  useEffect(() => {
    // switch between cameras
    if (isScanning && hasStartedRef.current) {
      startScanner({
        scanner: scannerRef.current,
        cameraId: selectedCamera,
        camConfig,
        onSuccessCallback,
      });
    } else if (!isScanning && hasStartedRef.current) {
      // stop and clear camera stream
      stopScanner(scannerRef.current);
      scannerRef.current = null;
      hasStartedRef.current = false;
    }
  }, [camConfig, isScanning, selectedCamera, onSuccessCallback]);

  useEffect(() => {
    // reset and clear active camera stream
    return () => {
      setIsScanning(false);
      stopScanner(scannerRef.current);
      scannerRef.current = null;
      hasStartedRef.current = false;
    };
  }, [setIsScanning]);

  return (
    <Backdrop
      open={isScanning}
      sx={{
        backdropFilter: 'blur(4px)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScannerTitle title={t('title.scanQrCode') || 'Scan QR code'} />
      <Loader
        BoxProps={{
          sx: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          },
        }}
        CircularProps={{
          sx: { color: (theme) => theme.palette.white.main },
        }}
        TypographyProps={{
          sx: { color: (theme) => theme.palette.white.main },
        }}
        loadingText={`${t('common:hint.starting')}...`}
      />
      <Box id="reader" sx={{ width: '100%', height: '100%' }} />
      <IconButton
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
        }}
        onClick={() => {
          if (scannerRef.current && scannerRef.current.getState() === 2) {
            scannerRef.current.stop().then(() => {
              scannerRef.current?.clear();
            });
          }
          setIsScanning(false);
        }}
      >
        <CancelIcon sx={{ color: (theme) => theme.palette.white.main }} />
      </IconButton>
      <ButtonWrapper minWidth={minSide} isMobile={isMobile}>
        <ScannerOptions />
      </ButtonWrapper>
    </Backdrop>
  );
};

export const MemoizedScanner = memo(Scanner);

export default MemoizedScanner;
