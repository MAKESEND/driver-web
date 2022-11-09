import type { FacingMode } from 'types';
import type { Html5Qrcode } from 'html5-qrcode';
import type { Html5QrcodeCameraScanConfig } from 'html5-qrcode/esm/html5-qrcode';

export interface CameraStarter {
  facingMode?: keyof typeof FacingMode;
  deviceId?: { exact: string };
}

export interface StartScannerArgs {
  scanner: Html5Qrcode | null;
  cameraId?: string;
  onSuccessCallback?:
    | ((decodedText: string) => void)
    | ((decodedText: string) => Promise<void>);
  camConfig?: Html5QrcodeCameraScanConfig;
}

export const startScanner = async ({
  scanner,
  cameraId,
  onSuccessCallback,
  camConfig = { fps: 2 },
}: StartScannerArgs) => {
  const onSuccess = (decodedText: string) => {
    if (onSuccessCallback) {
      onSuccessCallback(decodedText);
    } else {
      console.log(decodedText);
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
