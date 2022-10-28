import type { UserData } from 'types';
import { useState, useEffect, useRef, createContext } from 'react';
import { useRouter } from 'next/router';
import { useUser } from 'hooks/useQueryData';
import omit from 'lodash/omit';
import PageLoader from 'components/common/loader/PageLoader';

type TUserData = UserData | null;

export const UserContext = createContext<
  [TUserData, React.Dispatch<React.SetStateAction<TUserData>>] | null
>(null);

export interface SessionProviderProps {
  Loader?: React.ReactNode;
  children?: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  Loader,
  children,
}) => {
  const router = useRouter();
  const initRef = useRef<boolean>(true);
  const redirectRef = useRef<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const { data, isLoading, isError } = useUser({
    refetchOnWindowFocus: true,
    retry: 0,
    cacheTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    // revalidate userData with cookie
    if (data?.redirect) {
      setUserData(omit(data, ['redirect']));
      if (!isAuthPath(data.redirect.destination)) {
        redirectRef.current = data.redirect.destination;
      }
    } else {
      setUserData(data ?? null);
    }

    return () => {
      redirectRef.current = null;
    };
  }, [data, setUserData]);

  useEffect(() => {
    // unauthenticated, redirect to login
    if (isError && !initRef.current && !isAuthPath(router.pathname)) {
      router.replace('/auth/login');
    }
  }, [isError, router]);

  useEffect(() => {
    // redirect after authentication
    const isOnAuthRoute = isAuthPath(router.pathname);

    if (userData && isOnAuthRoute) {
      router.replace(redirectRef.current ?? '/dashboard');
    }
  }, [userData, isLoading, router]);

  if (isLoading && initRef.current)
    return Loader ? <>{Loader}</> : <PageLoader />;

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
};

export default SessionProvider;

const isAuthPath = (path: string): boolean => /auth/i.test(path);
