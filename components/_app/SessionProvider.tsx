import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useUser } from 'hooks/useQueryData';
import omit from 'lodash/omit';
import { useRecoilState } from 'recoil';
import { userDataState } from 'states/auth';
import PageLoader from 'components/common/loader/PageLoader';

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
  const [userData, setUserData] = useRecoilState(userDataState);

  const { data, isLoading, isError } = useUser({
    refetchOnWindowFocus: true,
    retry: 0,
    cacheTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    initRef.current = false;

    return () => {
      initRef.current = true;
      setUserData(null);
    };
  }, [setUserData]);

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

  if (isLoading && initRef.current) return <>{Loader}</> ?? <PageLoader />;

  return <>{children}</>;
};

export default SessionProvider;

function isAuthPath(path: string) {
  return /auth/i.test(path);
}
