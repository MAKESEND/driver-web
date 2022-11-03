import type { ScannedResult, ScannerConfig } from 'types';
import { useState, useEffect } from 'react';
import SideDrawer from 'components/common/SideDrawer';
import ScannerResultSingle from 'components/scanner/scanner-result/single/ScannerResultSingle';

export interface TouchScreenProps {
  scannerConfig: ScannerConfig | null;
  scannedResult?: ScannedResult[];
}

export const TouchScreen: React.FC<TouchScreenProps> = ({
  scannerConfig,
  scannedResult = [],
}) => {
  const isSingleMode = scannerConfig?.mode === 'single';
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (scannedResult) {
      setOpenDrawer(true);
    }
  }, [scannedResult]);

  return (
    <SideDrawer open={openDrawer} setOpen={setOpenDrawer}>
      {/* TODO render scanned result for bulk mode */}
      {isSingleMode ? (
        <ScannerResultSingle
          scannedResult={scannedResult}
          task={scannerConfig?.task}
        />
      ) : null}
    </SideDrawer>
  );
};

export default TouchScreen;
