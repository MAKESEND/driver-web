import { useContext } from 'react';
import { UserContext } from 'components/_app/SessionProvider';

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) throw new Error('useUser must be used in SessionProvider');

  return context;
};

export default useUser;
