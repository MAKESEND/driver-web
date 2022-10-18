import type { GetServerSidePropsContext } from 'next';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'utils/auth/jwt';

export const getUser = (
  req: GetServerSidePropsContext['req']
): JwtPayload | null => {
  try {
    if (typeof globalThis.window !== 'undefined') {
      throw new Error('getUser can only be called on server-side!');
    }

    if (!req.cookies?.token) {
      throw new Error('unauthenticated');
    }

    return jwt.verify(req.cookies.token) as JwtPayload;
  } catch (error: any) {
    return null;
  }
};

export const auth = { getUser };

export default auth;
