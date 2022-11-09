import type {
  ScannerMode,
  ScannerTask,
  ScannerConfig,
  ScannedResult,
} from 'types';
import { useState, useRef } from 'react';
import { ScannerContext } from 'context/ScannerContext';
import ScannerButtons from 'components/_scanner/buttons/ScannerButtons';
import { Stack, Slide } from '@mui/material';

import dynamic from 'next/dynamic';
const ScannerResult = dynamic(
  () => import('components/_scanner/ScannerResult')
);
const ScannerDenied = dynamic(
  () => import('components/_scanner/buttons/ScannerDenied')
);
const Scanner = dynamic(() => import('components/_scanner/Scanner'), {
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
  const scannedResultRef = useRef<ScannedResult[]>([]);
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [openResult, setOpenResult] = useState<boolean>(false);
  const [scannerConfig, setScannerConfig] = useState<ScannerConfig>({
    mode,
    task,
  });

  return (
    <ScannerContext.Provider value={scannedResultRef}>
      <Slide in direction="down">
        <Stack sx={{ height: '100%', p: 2 }}>
          <Scanner
            isScanning={isScanning}
            setIsScanning={setIsScanning}
            setIsDenied={setIsDenied}
            setOpenResult={setOpenResult}
            scannerConfig={scannerConfig}
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
            open={openResult}
            setOpen={setOpenResult}
            scannerConfig={scannerConfig}
          />
        </Stack>
      </Slide>
    </ScannerContext.Provider>
  );
};

export default ScannerPanel;
