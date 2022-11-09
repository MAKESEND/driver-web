import type { JwtPayload } from 'jsonwebtoken';
import jsonwebtoken from 'jsonwebtoken';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: {
    ENV: { APP_ENV },
  },
  serverRuntimeConfig: { jwt: jwtSecret },
} = getConfig();

export const jwt = {
  verify(token?: string): JwtPayload | void {
    if (!token) {
      throw new Error('no token to verify');
    }

    const secret = jwtSecret[APP_ENV];
    return jsonwebtoken.verify(token, secret) as JwtPayload;
  },
};

export default jwt;
