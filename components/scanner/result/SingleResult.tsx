import type { ScannedResult, ScannerTask } from 'types';
import Link from 'next/link';
import first from 'lodash/first';
import last from 'lodash/last';
import { useState, useEffect } from 'react';
import parseStringTypes from 'utils/parseStringType';

export interface SingleResultProps {
  task?: keyof typeof ScannerTask;
  scannedResult?: ScannedResult[];
}

type Types = ReturnType<typeof parseStringTypes>;

export const SingleResult: React.FC<SingleResultProps> = ({
  // type, // TODO check if scanner type is required
  scannedResult = [],
}) => {
  const [types, setTypes] = useState<Types | null>(null);
  const [id, setId] = useState<string>('');
  const result = last(scannedResult);

  useEffect(() => {
    if (result) {
      setTypes(parseStringTypes(result?.text));
      setId(first(/(ex|ms|ns)\d{13}/i.exec(result?.text)) ?? '');
    }
  }, [result]);

  if (!result) return null;

  if (types?.trackingId) {
    // TODO check if redirect to dropoff task by tracking ID by default
    return (
      <Link href={`/tasks/dropoff/${id}`} passHref>
        {id}
      </Link>
    );
  }

  if (types?.orderId) {
    return (
      <Link href={`/tasks/pickup/${id}`} passHref>
        {id}
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

export default SingleResult;
