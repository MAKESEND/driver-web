import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'utils/auth/cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieStore = cookie.parse(req.headers.cookie);
  const token = cookieStore?.token;

  res.setHeader('Set-Cookie', `token=${token}; path=/; Max-Age=0; expires=0;`);
  res.status(200).json({ message: 'success', data: null });
}
