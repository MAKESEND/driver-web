import type { ScannerConfig } from 'types';
import useTouchScreen from 'hooks/useTouchScreen';

import dynamic from 'next/dynamic';
const RegularScreen = dynamic(
  () => import('components/scanner/result/RegularScreen')
);
const TouchScreen = dynamic(
  () => import('components/scanner/result/TouchScreen')
);

export interface ScannerResultProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  scannerConfig: ScannerConfig | null;
}

export const ScannerResult: React.FC<ScannerResultProps> = ({
  open = false,
  setOpen = () => console.warn('no setOpen given ScannerResult'),
  scannerConfig,
}) => {
  const isTouch = useTouchScreen();

  if (isTouch)
    return (
      <TouchScreen
        open={open}
        setOpen={setOpen}
        scannerConfig={scannerConfig}
      />
    );

  return (
    <RegularScreen
      open={open}
      setOpen={setOpen}
      scannerConfig={scannerConfig}
    />
  );
};

export default ScannerResult;
