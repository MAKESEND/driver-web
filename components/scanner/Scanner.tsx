import type { FacingMode, ScannedResult } from 'types';
import type { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useMemo, useCallback, useRef } from 'react';
import { useWindowSize } from 'react-use';
import { useTranslation } from 'next-i18next';
import { isMobile } from 'react-device-detect';
import { camerasState, selectedCameraState } from 'states';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box, Backdrop, IconButton, styled } from '@mui/material';
import Loader from 'components/common/loader/Loader';
import ScannerButtons from './ScannerButtons';
import ScannerTitle from './ScannerTitle';

import dynamic from 'next/dynamic';
const CancelIcon = dynamic(() => import('@mui/icons-material/Cancel'));

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

export interface CameraStarter {
  facingMode?: keyof typeof FacingMode;
  deviceId?: { exact: string };
}

export interface ScannerFullProps {
  isScanning?: boolean;
  setIsScanning?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDenied?: React.Dispatch<React.SetStateAction<boolean>>;
  setScannedResult?: React.Dispatch<React.SetStateAction<ScannedResult | null>>;
}

export const Scanner: React.FC<ScannerFullProps> = ({
  isScanning = false,
  setIsScanning = () => console.warn('no setIsScanning given to ScannerFull'),
  setIsDenied = () => console.warn('no setIsDenied given to ScannerFull'),
  setScannedResult = () =>
    console.warn('no setScannedResult given to ScannerFull'),
}) => {
  const { width, height } = useWindowSize();
  const { t } = useTranslation(['scanner', 'common']);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasStartedRef = useRef<boolean>(false);
  const setCameras = useSetRecoilState(camerasState);
  const selectedCamera = useRecoilValue(selectedCameraState);

  const minWidth = useMemo(() => Math.min(width, height), [width, height]);
  const camConfig = useMemo(() => {
    const minWidth = Math.min(height, width);
    const ratio = 2 / 3;
    const aspectRatio = isMobile
      ? Math.ceil((height / width) * 100) / 100
      : width / height;
    const qrbox = isMobile
      ? { width: minWidth * ratio, height: minWidth * ratio }
      : 300;
    return {
      fps: 2,
      qrbox,
      aspectRatio,
    };
  }, [width, height]);

  const startScanner = useCallback(
    async (scanner: Html5Qrcode | null, cameraId?: string) => {
      const onSuccess = (decodedText: string) => {
        setScannedResult({
          text: decodedText,
          scanned_at: new Date().toISOString(),
        });
      };

      const onError = (errorText: string) => {
        return errorText;
      };

      try {
        if (scanner) {
          if (scanner.getState() === 2) {
            await scanner.stop();
            scanner.clear();
          }

          let camStarter: CameraStarter = {
            facingMode: 'environment',
          };
          if (cameraId) {
            camStarter = { deviceId: { exact: cameraId } };
          }

          await scanner.start(camStarter, camConfig, onSuccess, onError);
        }
      } catch (error: any) {
        console.log('something went wrong when starting camera');
        console.log(error.message || error);
      }
    },
    [camConfig, setScannedResult]
  );

  const initScanner = useCallback(
    async (camId: string) => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        const cams = await Html5Qrcode.getCameras();
        if (cams.length) {
          setCameras(cams);
          const scanner = new Html5Qrcode('reader');
          await stopCamera(scannerRef.current);
          scannerRef.current = scanner;
          hasStartedRef.current = true;
          startScanner(scanner, camId);
          return;
        }

        throw new Error('no camera is available');
      } catch (error: any) {
        console.log('something went wrong when init qr reader');
        console.warn(error);
        if (error === 'NotAllowedError : Permission denied') {
          setIsScanning(false);
          setIsDenied(true);
        }
      }
    },
    [startScanner, setIsScanning, setIsDenied, setCameras]
  );

  const stopCamera = async (camera: Html5Qrcode | null) => {
    try {
      if (camera && camera.getState() === 2) {
        await camera.stop();
        camera.clear();
      }
    } catch (error: any) {
      console.warn('something went wrong when stopping scanner');
      console.log(error?.message ?? error);
    }
  };

  useEffect(() => {
    // init scanner with camera
    if (isScanning && !hasStartedRef.current) {
      initScanner(selectedCamera);
    }
  }, [initScanner, isScanning, selectedCamera]);

  useEffect(() => {
    // switch between cameras
    if (isScanning && hasStartedRef.current) {
      startScanner(scannerRef.current, selectedCamera);
    } else if (!isScanning && hasStartedRef.current) {
      // stop and clear camera stream
      stopCamera(scannerRef.current);
      scannerRef.current = null;
      hasStartedRef.current = false;
    }
  }, [isScanning, startScanner, selectedCamera]);

  useEffect(() => {
    // reset and clear active camera stream
    return () => {
      stopCamera(scannerRef.current);
      scannerRef.current = null;
      hasStartedRef.current = false;
      setIsScanning(false);
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
      <ScannerTitle title={t('title.scanQrCode')} />
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
          sx: { color: (t) => t.palette.white.main },
        }}
        TypographyProps={{
          sx: { color: (t) => t.palette.white.main },
        }}
        text={`${t('hint.starting', { ns: 'common' })}...`}
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
        <CancelIcon sx={{ color: (t) => t.palette.white.main }} />
      </IconButton>
      <ButtonWrapper minWidth={minWidth}>
        <ScannerButtons />
      </ButtonWrapper>
    </Backdrop>
  );
};

export default Scanner;
