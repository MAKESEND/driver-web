import type { ScannedResult } from 'types';
import { createContext } from 'react';

export const ScannerContext = createContext<React.MutableRefObject<
  ScannedResult[]
> | null>(null);
