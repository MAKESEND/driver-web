import type {
  ScannerMode,
  ScannerTask,
  ScannerConfig,
  ScannedResult,
} from 'types';
import { useState } from 'react';
import ScannerButtons from 'components/scanner/buttons/ScannerButtons';
import { Stack, Slide } from '@mui/material';

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
  task?: keyof typeof ScannerTask;
}

export const ScannerPanel: React.FC<ScannerPanelProps> = ({
  mode = 'single',
  task = 'scan',
}) => {
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedResult, setScannedResult] = useState<ScannedResult[]>([]);
  const [scannerConfig, setScannerConfig] = useState<ScannerConfig>({
    mode,
    task,
  });

  return (
    <Slide in direction="down">
      <Stack sx={{ height: '100%', p: 2 }}>
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
    </Slide>
  );
};

export default ScannerPanel;
