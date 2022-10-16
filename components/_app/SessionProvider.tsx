import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useValidateUser } from 'hooks';
import omit from 'lodash/omit';
import { useRecoilState } from 'recoil';
import { userDataState } from 'states/auth';
import PageLoader from 'components/common/loader/PageLoader';

export interface SessionProviderProps {
  children?: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [isOnAuthRoute, setIsOnAuthRoute] = useState<boolean>(false);
  const initRef = useRef(true);
  const [userData, setUserData] = useRecoilState(userDataState);
  const [redirectDestination, setRedirectDestination] = useState<string | null>(
    null
  );

  const { data, isLoading } = useValidateUser({
    refetchOnWindowFocus: true,
    retry: 0,
  });

  useEffect(() => {
    initRef.current = false;

    return () => {
      initRef.current = true;
    };
  }, []);

  useEffect(() => {
    // check if the user is on auth route
    setIsOnAuthRoute(/auth/i.test(router.pathname));
    return () => setIsOnAuthRoute(false);
  }, [router.pathname]);

  useEffect(() => {
    // revalidate userData with cookie
    if (data?.redirect) {
      setUserData(omit(data, ['redirect']));
      setRedirectDestination(data.redirect.destination);
    } else {
      setUserData(data ?? null);
    }

    return () => setRedirectDestination(null);
  }, [data, setUserData]);

  useEffect(() => {
    if (userData && isOnAuthRoute) {
      router.replace(redirectDestination ?? '/dashboard');
    } else if (!userData && !isOnAuthRoute) {
      // redirect user if user data is cleared
      if (!initRef.current) {
        router.replace('/auth/login');
      }
    }
  }, [redirectDestination, userData, router, isOnAuthRoute]);

  if (isLoading) return <PageLoader isLoading />;

  return <>{children}</>;
};

export default SessionProvider;
