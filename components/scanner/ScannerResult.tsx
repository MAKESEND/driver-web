import type { ScannerConfig } from 'types';
import useTouchScreen from 'hooks/useTouchScreen';
import DesktopScreen from 'components/scanner/scanner-result/DesktopScreen';

import dynamic from 'next/dynamic';
const TouchScreen = dynamic(
  () => import('components/scanner/scanner-result/TouchScreen')
);

export interface ScannerResultProps {
  scannerConfig: ScannerConfig;
}

export const ScannerResult: React.FC<ScannerResultProps> = ({
  scannerConfig,
}) => {
  const isTouchScreen = useTouchScreen();

  if (isTouchScreen) return <TouchScreen scannerConfig={scannerConfig} />;

  return <DesktopScreen />;
};

export default ScannerResult;
