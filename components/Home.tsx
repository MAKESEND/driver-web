import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from 'hooks/useUser';

export const Home: React.FC = () => {
  const router = useRouter();
  const [userData] = useUser();

  useEffect(() => {
    router.push(userData ? '/dashboard' : '/auth/login');
  }, [userData, router]);

  return null;
};

export default Home;
