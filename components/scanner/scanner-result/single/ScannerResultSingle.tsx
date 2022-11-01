import type { ScannedResult, ScannerType } from 'types';
import Link from 'next/link';
import last from 'lodash/last';
import { useState, useEffect } from 'react';
import parseStringTypes from 'utils/parseStringType';

export interface ScannerResultProps {
  type?: keyof typeof ScannerType;
  scannedResult?: ScannedResult[];
}

type Types = ReturnType<typeof parseStringTypes>;

export const ScannerResult: React.FC<ScannerResultProps> = ({
  // type, // TODO check if scanner type is required
  scannedResult = [],
}) => {
  const [types, setTypes] = useState<Types | null>(null);
  const result = last(scannedResult);

  useEffect(() => {
    if (result) {
      setTypes(parseStringTypes(result?.text));
    }
  }, [result]);

  if (!result) return null;

  if (types?.trackingId) {
    // TODO check if redirect to dropoff task by tracking ID by default
    return (
      <Link href={`/tasks/dropoff/${result.text}`} passHref>
        {result.text}
      </Link>
    );
  }

  if (types?.orderId) {
    return (
      <Link href={`/tasks/pickup/${result.text}`} passHref>
        {result.text}
      </Link>
    );
  }

  if (types?.url)
    return (
      <a href={result.text} rel="noreferrer" target="_blank">
        {result.text}
      </a>
    );

  return <>{result.text}</>;
};

export default ScannerResult;
