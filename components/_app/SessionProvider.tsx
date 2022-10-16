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
  const [userData, setUserData] = useRecoilState(userDataState);
  const redirectRef = useRef<string | null>(null);

  const { data, isLoading } = useValidateUser({
    refetchOnWindowFocus: true,
    retry: 0,
  });

  useEffect(() => {
    // revalidate userData with cookie
    if (data?.redirect) {
      setUserData(omit(data, ['redirect']));
      redirectRef.current = data.redirect.destination;
    } else {
      setUserData(data ?? null);
    }

    return () => {
      redirectRef.current = null;
    };
  }, [data, setUserData]);

  useEffect(() => {
    const isOnAuthRoute = /auth/i.test(router.pathname);

    if (userData && isOnAuthRoute) {
      router.replace(redirectRef.current ?? '/dashboard');
    } else if (!userData && !isOnAuthRoute) {
      // redirect user if user data is cleared
      router.replace('/auth/login');
    }
  }, [userData, router]);

  if (isLoading) return <PageLoader isLoading />;

  return <>{children}</>;
};

export default SessionProvider;
