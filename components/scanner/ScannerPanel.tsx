import type {
  ScannerMode,
  ScannerType,
  ScannerConfig,
  ScannedResult,
} from 'types';
import { useState } from 'react';
import ScannerButtons from 'components/scanner/buttons/ScannerButtons';
import { Stack } from '@mui/material';

import dynamic from 'next/dynamic';
const ScannerResult = dynamic(() => import('components/scanner/ScannerResult'));
const ScannerDenied = dynamic(
  () => import('components/scanner/buttons/ScannerDenied')
);
const Scanner = dynamic(() => import('components/scanner/Scanner'), {
  ssr: false,
});

export interface ScannerPanelProps {
  mode?: keyof typeof ScannerMode;
  type?: keyof typeof ScannerType;
}

export const ScannerPanel: React.FC<ScannerPanelProps> = ({
  mode = 'single',
  type = 'scan',
}) => {
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannerConfig, setScannerConfig] = useState<ScannerConfig>({
    mode,
    type,
  });
  const [scannedResult, setScannedResult] = useState<ScannedResult | null>(
    null
  );

  return (
    <Stack sx={{ height: '100%' }}>
      <Scanner
        isScanning={isScanning}
        setIsScanning={setIsScanning}
        setIsDenied={setIsDenied}
        setScannedResult={setScannedResult}
      />
      <Stack
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isDenied ? (
          <ScannerDenied />
        ) : (
          <ScannerButtons
            isScanning={isScanning}
            setIsScanning={setIsScanning}
            scannerConfig={scannerConfig}
            setScannerConfig={setScannerConfig}
          />
        )}
      </Stack>
      <ScannerResult
        scannerConfig={scannerConfig}
        scannedResult={scannedResult}
      />
    </Stack>
  );
};

export default ScannerPanel;
