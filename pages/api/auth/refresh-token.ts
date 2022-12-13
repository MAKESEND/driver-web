import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import getConfig from 'next/config';
import tokenMethods from 'utils/auth/token';
import { api } from 'utils/services/apiServices';

const {
  serverRuntimeConfig: {
    jwt: { accessTokenSecret, refreshTokenSecret },
  },
} = getConfig();

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(400);
  if (!req.headers['refreshToken']) return res.status(403);

  const isProdENV = process.env.NODE_ENV === 'production';

  try {
    // check if incoming refreshToken is valid
    const refreshToken = (req.headers['refreshToken'] as string)?.split(' ')[0];

    const decoded = jwt.verify(refreshToken, refreshTokenSecret) as {
      id: string;
      driverId: string;
    };

    const {
      data: { data: driverData },
    } = await api.getDriverData(decoded.driverId);

    if (!driverData) {
      // no driver data is found
      return res.send(403);
    }

    const { id, driver_id: driverId } = driverData;

    // TODO: revoke refreshToken in DB
    // Warning! without storing refreshToken in DB
    // this allows multiple login and CANNOT logout user

    // sign new refreshToken
    const tokenAge = Math.ceil(tokenMethods.getMaxAge('th') / 1000);
    const newRefreshToken = jwt.sign({ id, driverId }, refreshTokenSecret, {
      expiresIn: tokenAge,
    });

    // set new refreshToken in cookie
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${newRefreshToken}; httpOnly; samesite=None; path=/; Max-Age=${tokenAge}; ${
        isProdENV ? 'Secure;' : ''
      }`
    );

    // sign new accessToken
    const newAccessToken = jwt.sign({ id, driverId }, accessTokenSecret, {
      expiresIn: '15m',
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error: any) {
    console.log('something went wrong /api/auth/refresh-token');
    console.error(error);
    return res.status(403);
  }
};

export default handler;
