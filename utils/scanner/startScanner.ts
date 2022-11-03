import type { FacingMode, ScannedResult, ScannerMode } from 'types';
import type { Html5Qrcode } from 'html5-qrcode';
import type { Html5QrcodeCameraScanConfig } from 'html5-qrcode/esm/html5-qrcode';

export interface CameraStarter {
  facingMode?: keyof typeof FacingMode;
  deviceId?: { exact: string };
}

export interface StartScannerArgs {
  scanner: Html5Qrcode | null;
  cameraId?: string;
  scannedResultRef?: React.MutableRefObject<ScannedResult[]>;
  camConfig?: Html5QrcodeCameraScanConfig;
  scannerMode?: keyof typeof ScannerMode;
}

export const startScanner = async ({
  scanner,
  cameraId,
  scannedResultRef = { current: [] as ScannedResult[] },
  camConfig = { fps: 2 },
  scannerMode = 'single',
}: StartScannerArgs) => {
  const onSuccess = (decodedText: string) => {
    // TODO: handle for multiple mode

    if (scannerMode === 'single') {
      const cache = [...scannedResultRef.current];

      scannedResultRef.current = [
        ...cache,
        {
          text: decodedText,
          scanned_at: new Date().toISOString(),
        },
      ];
    }
  };

  const onError = (errorText: string) => {
    return errorText;
  };

  try {
    if (!scanner) {
      throw new Error('no scanner to handle');
    }
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
  } catch (error: any) {
    console.log('something went wrong when starting camera');
    console.log(error?.message || error);
  }
};

export default startScanner;
