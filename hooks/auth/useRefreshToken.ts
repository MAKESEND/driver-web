import useAuth from './useAuth';
import { api } from 'utils/services/apiServices';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (...args: Parameters<typeof api.refreshToken>) => {
    const {
      data: { accessToken },
    } = await api.refreshToken(...args);

    setAuth((prev) => {
      if (!prev) return prev;
      return { ...prev, accessToken };
    });

    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
