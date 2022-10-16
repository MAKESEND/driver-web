import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'utils/auth/jwt';
import cookie from 'utils/auth/cookie';
import last from 'lodash/last';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let status = 200;
  let message = 'success';
  let data = null;
  let token;

  try {
    const { host, referer } = req.headers;
    const paths = referer?.split(host as string);
    const destination = last(paths);

    const cookieStore = cookie.parse(req.headers.cookie);
    token = cookieStore?.token;

    if (!token) {
      status = 401;
      throw new Error('Unauthorized');
    }

    data = jwt.verify(token);

    if ((data?.exp ?? 0) <= Math.ceil(Date.now() / 1000)) {
      status = 401;
      throw new Error('token expired');
    }

    if (destination) {
      data = { ...data, redirect: { destination } };
    }
  } catch (error: any) {
    status = /^2\d{2}$/g.test(String(status)) ? 500 : status;

    if (
      error?.message === 'jwt malformed' ||
      error?.message === 'invalid signature'
    ) {
      status = 401;
    }

    message = error?.message ?? 'server error';
    console.log('something went wrong in /api/auth/user');
    console.log(message);

    cookie.remove(res, 'token', token);
  }

  res.status(status).json({ status, message, data });
}
