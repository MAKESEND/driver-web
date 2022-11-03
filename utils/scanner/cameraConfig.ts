import type { Html5QrcodeCameraScanConfig } from 'html5-qrcode/esm/html5-qrcode';

export const cameraConfig = ({
  width = 0,
  height = 0,
  isMobile = false,
}: {
  width: number;
  height: number;
  isMobile?: boolean;
}): Html5QrcodeCameraScanConfig => {
  const ratio = 2 / 3;
  const minSide = Math.min(width, height);
  const aspectRatio = isMobile
    ? Math.ceil((height / width) * 100) / 100
    : width / height;
  const qrbox = isMobile
    ? { width: minSide * ratio, height: minSide * ratio }
    : 300;

  return {
    fps: 2,
    qrbox,
    aspectRatio,
  };
};

export default cameraConfig;
