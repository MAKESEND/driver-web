import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';
import {
  QueryClient as ReactQueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DefaultSeo } from 'next-seo';
import { DefaultSeoConfig } from 'next-seo.config';
import SessionChecker from './SessionChecker';
import OnlineIndicator from './OnlineIndicator';
import RouteLoader from 'components/common/loader/RouteLoader';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from 'styles';

export const CoreProvider: React.FC<{
  children?: React.ReactNode;
  session: any;
}> = ({ children, session }) => {
  const [queryClient] = useState(() => new ReactQueryClient());
  const [refetchInterval, setRefetchInterval] = useState<number>(0);

  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus
      refetchInterval={refetchInterval}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <DefaultSeo {...DefaultSeoConfig} />
            <CssBaseline />
            <SessionChecker setter={setRefetchInterval} />
            <RouteLoader>{children}</RouteLoader>
            <OnlineIndicator />
            <ReactQueryDevtools />
          </RecoilRoot>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default CoreProvider;
