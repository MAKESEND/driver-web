import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useUser } from 'hooks/useQueryData';
import omit from 'lodash/omit';
import { useRecoilState } from 'recoil';
import { userDataState } from 'states/auth';

export interface SessionProviderProps {
  children?: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [userData, setUserData] = useRecoilState(userDataState);
  const redirectRef = useRef<string | null>(null);

  const { data, isLoading } = useUser({
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
    const isOnAuthRoute = isAuthPath(router.pathname);

    if (userData && isOnAuthRoute) {
      router.replace(redirectRef.current ?? '/dashboard');
    } else if (!userData && !isLoading && !isOnAuthRoute) {
      // redirect user if user data is cleared
      router.replace('/auth/login');
    }
  }, [userData, isLoading, router]);

  return <>{children}</>;
};

export default SessionProvider;

function isAuthPath(path: string) {
  return /auth/i.test(path);
}
