import { useContext } from 'react';
import { ScannerContext } from 'context/ScannerContext';

export const useScannerResult = () => {
  const ctx = useContext(ScannerContext);

  if (!ctx)
    throw new Error('useScannerResult shall only be used in ScannerContext');

  return ctx;
};
