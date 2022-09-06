import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Fade } from '@mui/material';
import PageLoader from 'components/common/loader/PageLoader';

export const RouteLoader: FC<{ children: ReactNode }> = ({ children }) => {
  const { events, asPath } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const changeStart = () => setIsLoading(true);
    const changeComplete = () => setIsLoading(false);

    events.on('routeChangeStart', changeStart);
    events.on('routeChangeComplete', changeComplete);
    events.on('routeChangeError', changeComplete);

    return () => {
      events.off('routeChangeStart', changeStart);
      events.off('routeChangeComplete', changeComplete);
      events.off('routeChangeError', changeComplete);
      setIsLoading(false);
    };
  }, [events]);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <Fade key={asPath} in>
        <Box>{children}</Box>
      </Fade>
    </>
  );
};

export default RouteLoader;
