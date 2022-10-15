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
};

export default cookie;
