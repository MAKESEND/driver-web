import type { ScannerConfig } from 'types';
import useTouchScreen from 'hooks/useTouchScreen';
import DesktopScreen from 'components/scanner/scanner-result/DesktopScreen';

import dynamic from 'next/dynamic';
const TouchScreen = dynamic(
  () => import('components/scanner/scanner-result/TouchScreen')
);

export interface ScannerResultProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  scannerConfig: ScannerConfig;
}

export const ScannerResult: React.FC<ScannerResultProps> = ({
  open = false,
  setOpen = () => console.warn('no setOpen given ScannerResult'),
  scannerConfig,
}) => {
  const isTouchScreen = useTouchScreen();

  if (isTouchScreen)
    return (
      <TouchScreen
        open={open}
        setOpen={setOpen}
        scannerConfig={scannerConfig}
      />
    );

  return (
    <DesktopScreen
      open={open}
      setOpen={setOpen}
      scannerConfig={scannerConfig}
    />
  );
};

export default ScannerResult;
