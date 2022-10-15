import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    publicRuntimeConfig: { version },
  } = getConfig();

  res.status(200).json(version);
}
