import { useContext } from 'react';
import { AuthContext } from 'components/_app/AuthProvider';

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error('useAuth can only be used in Provider');

  return ctx;
};

export default useAuth;
