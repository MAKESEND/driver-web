import type { Camera, ScannerMode, ScannedResult } from 'types';
import type { SetterOrUpdater } from 'recoil';
import type { Html5Qrcode } from 'html5-qrcode';
import type { Html5QrcodeCameraScanConfig } from 'html5-qrcode/esm/html5-qrcode';
import startScanner from 'utils/scanner/startScanner';
import stopScanner from 'utils/scanner/stopScanner';

export const initScanner = async ({
  cameraId,
  camConfig,
  scannerRef,
  setIsScanning,
  setIsDenied,
  setCameras,
  onSuccessCallback,
}: {
  cameraId: string;
  camConfig: Html5QrcodeCameraScanConfig;
  scannerRef: React.MutableRefObject<Html5Qrcode | null>;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDenied: React.Dispatch<React.SetStateAction<boolean>>;
  setCameras: SetterOrUpdater<Camera[]>;
  onSuccessCallback:
    | ((decodedText: string) => void)
    | ((decodedText: string) => Promise<void>);
}): Promise<boolean> => {
  try {
    const { Html5Qrcode } = await import('html5-qrcode');

    const cams = await Html5Qrcode.getCameras();

    if (cams.length) {
      setCameras(cams);
      const scanner = new Html5Qrcode('reader');

      await stopScanner(scannerRef.current);

      scannerRef.current = scanner;

      startScanner({
        scanner,
        cameraId,
        camConfig,
        onSuccessCallback,
      });

      return true;
    }

    throw new Error('no camera is available');
  } catch (error: any) {
    console.log('something went wrong when init qr reader');
    console.warn(error);
    if (error === 'NotAllowedError : Permission denied') {
      setIsScanning(false);
      setIsDenied(true);
    }

    return false;
  }
};

export default initScanner;
