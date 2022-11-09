import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    publicRuntimeConfig: {
      ENV: { APP_ENV },
      version,
    },
  } = getConfig();

  res.status(200).json({
    APP_ENV,
    version,
    requested_at: new Date(),
  });
}
