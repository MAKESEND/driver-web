import type { ScannedResult, ScannerType } from 'types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import parseStringTypes from 'utils/parseStringType';

export interface ScannerResultProps {
  type?: keyof typeof ScannerType;
  scannedResult?: ScannedResult | null;
}

type Types = ReturnType<typeof parseStringTypes>;

export const ScannerResult: React.FC<ScannerResultProps> = ({
  // type, // TODO check if scanner type is required
  scannedResult = null,
}) => {
  const [types, setTypes] = useState<Types | null>(null);

  useEffect(() => {
    if (scannedResult) {
      setTypes(parseStringTypes(scannedResult.text));
    }
  }, [scannedResult]);

  if (!scannedResult) return null;

  if (types?.trackingId) {
    // TODO check if redirect to dropoff task by tracking ID by default
    return (
      <Link href={`/tasks/dropoff/${scannedResult.text}`} passHref>
        {scannedResult.text}
      </Link>
    );
  }

  if (types?.orderId) {
    return (
      <Link href={`/tasks/pickup/${scannedResult.text}`} passHref>
        {scannedResult.text}
      </Link>
    );
  }

  if (types?.url)
    return (
      <a href={scannedResult.text} rel="noreferrer" target="_blank">
        {scannedResult.text}
      </a>
    );

  return <>{scannedResult.text}</>;
};

export default ScannerResult;
