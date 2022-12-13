import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import { api } from 'utils/services/apiServices';
import tokenMethods from 'utils/auth/token';

const {
  serverRuntimeConfig: {
    jwt: { accessTokenSecret, refreshTokenSecret },
  },
} = getConfig();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let status = 200;
  let message = 'success';
  let data = null;

  try {
    if (req.method === 'POST' && req.body.phone && req.body.dob) {
      const isProdENV = process.env.NODE_ENV === 'production';

      const [authResponse, _checkinResponse] = await Promise.all([
        api.authDriver(req.body),
        api.checkinDriver(req.body),
      ]);

      // process should fail if data cannot be assigned
      data = authResponse.data.id;
      status = authResponse.data.status;
      message = authResponse.data.message;

      const {
        data: { data: driverData },
      } = await api.getDriverData(data);

      if (!driverData) {
        throw new Error('driver data is missing from api.getDriverData');
      }

      const { id, driver_id: driverId, name, surname, nickname } = driverData;

      // sign new accessToken
      const accessToken = jwt.sign({ id, driverId }, accessTokenSecret);

      // return user info. and accessToken
      data = { id, driverId, name, surname, nickname, accessToken };

      const tokenAge = Math.ceil(tokenMethods.getMaxAge('th') / 1000);

      // sign new refreshToken
      const refreshToken = jwt.sign({ id, driverId }, refreshTokenSecret, {
        expiresIn: tokenAge,
      });

      // set refreshToken in cookie
      res.setHeader(
        'Set-Cookie',
        `refreshToken=${refreshToken}; httpOnly; samesite=None; path=/; Max-Age=${tokenAge}; ${
          isProdENV ? 'Secure;' : ''
        }`
      );
    } else {
      status = 401;
      message = 'Bad request';
    }
  } catch (error: any) {
    status = error?.response?.status ?? 500;
    message = error?.response?.data?.message ?? error?.message ?? 'error';
    console.log("something went wrong in '/api/auth/login");
    console.log(message);
  }

  res.status(status).json({ status, message, data });
}
