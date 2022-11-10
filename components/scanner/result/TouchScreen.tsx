import type { ScannerResultProps } from 'components/scanner/result/ScannerResult';
import { useState, useEffect } from 'react';
import { useScannerResult } from 'hooks/useScannerResult';
import SideDrawer from 'components/common/SideDrawer';
import SingleResult from 'components/scanner/result/SingleResult';

export const TouchScreen: React.FC<ScannerResultProps> = ({
  open = false,
  setOpen = () => console.warn('no setOpen given ScannerResult'),
  scannerConfig,
}) => {
  const isSingleMode = scannerConfig?.mode === 'single';
  const scannerResultRef = useScannerResult();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setOpenDrawer(true);
    }
  }, [open]);

  useEffect(() => {
    if (!openDrawer) {
      setOpen(false);
    }

    return () => setOpen(false);
  }, [openDrawer, setOpen]);

  return (
    <SideDrawer open={openDrawer} setOpen={setOpenDrawer} swipeAreaWidth={32}>
      {/* TODO render scanned result for bulk mode */}
      {isSingleMode ? (
        <SingleResult
          scannedResult={scannerResultRef.current}
          task={scannerConfig?.task}
        />
      ) : null}
    </SideDrawer>
  );
};

export default TouchScreen;
