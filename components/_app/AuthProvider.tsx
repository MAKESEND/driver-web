import type { UserData } from 'types';
import { createContext, useState, useEffect, useRef } from 'react';
import useRefreshToken from 'hooks/auth/useRefreshToken';
import { useRouter } from 'next/router';

export type TUserData = UserData | null;

export const AuthContext = createContext<{
  auth: TUserData;
  setAuth: React.Dispatch<React.SetStateAction<TUserData>>;
} | null>(null);

// TODO: replace SessionProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const refreshToken = useRefreshToken();
  const [auth, setAuth] = useState<TUserData>(null);
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    // set timer to refresh token when idle
    let timer = setTimeout(() => {
      try {
        refreshToken({ signal: abortControllerRef.current?.signal });
      } catch (error: any) {
        // redirect back to login page
        router.replace('/auth/login', {
          query: { from: encodeURIComponent(router.asPath) },
        });
      }
    }, auth?.exp ?? 0);

    return () => {
      clearTimeout(timer);
      abortControllerRef.current?.abort();
    };
  }, [auth, refreshToken, router]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
