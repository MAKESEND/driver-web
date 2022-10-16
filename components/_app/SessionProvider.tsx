import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useValidateUser } from 'hooks';
import { useRecoilState } from 'recoil';
import { userDataState } from 'states/auth';
import PageLoader from 'components/common/loader/PageLoader';
import MSDeliveryLoader from 'components/common/loader/delivery/MSDeliveryLoader';

export interface SessionProviderProps {
  children?: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [isOnAuthRoute, setIsOnAuthRoute] = useState<boolean>(false);
  const [userData, setUserData] = useRecoilState(userDataState);

  const { data, isLoading } = useValidateUser({
    refetchOnWindowFocus: true,
    retry: 0,
  });

  useEffect(() => {
    // check if the user is on auth route
    setIsOnAuthRoute(/auth/i.test(router.pathname));
    return () => setIsOnAuthRoute(false);
  }, [router.pathname]);

  useEffect(() => {
    // revalidate userData with cookie
    setUserData(data ?? null);
  }, [data, setUserData]);

  useEffect(() => {
    // redirect user if user data is cleared
    if (userData && isOnAuthRoute) {
      router.replace('/dashboard');
    } else if (!userData && !isOnAuthRoute) {
      router.replace('/auth/login');
    }
  }, [userData, router, isOnAuthRoute]);

  if (isLoading) return <PageLoader isLoading />;

  return <>{children}</>;
};

export default SessionProvider;
