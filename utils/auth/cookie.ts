import type { NextApiResponse } from 'next';

export const cookie = {
  parse(cookieStr?: string): { [key: string]: string } {
    const cookies = cookieStr?.split(';');

    if (cookies?.length) {
      const cookieStore: { [key: string]: string } = cookies.reduce(
        (store, cookie) => {
          const [key, value] = cookie.trim().split('=');
          return { ...store, [key]: value };
        },
        {}
      );

      return cookieStore;
    }

    return {};
  },
  remove(res: NextApiResponse, name: string, cookie?: string, path = '/') {
    res.setHeader(
      'Set-Cookie',
      `${name}=${cookie}; path=${path}; Max-Age=0; expires=0;`
    );
  },
};

export default cookie;
