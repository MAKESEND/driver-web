import type { Html5Qrcode } from 'html5-qrcode';

export const stopScanner = async (scanner: Html5Qrcode | null) => {
  try {
    if (scanner && scanner.getState() === 2) {
      await scanner.stop();
      scanner.clear();
    }
  } catch (error: any) {
    console.warn('something went wrong when stopping scanner');
    console.log(error?.message ?? error);
  }
};

export default stopScanner;
