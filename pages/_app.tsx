import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { DefaultSeoProps } from 'next-seo';
import type { SessionProviderProps } from 'next-auth/react';

import { useState } from 'react';
import { DefaultSeoConfig } from 'next-seo.config';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from 'styles';

import dynamic from 'next/dynamic';
const RecoilRoot = dynamic(() => import('components/common/RecoilRoot'));
const SessionProvider = dynamic<SessionProviderProps>(() =>
  import('next-auth/react').then((mod) => mod.SessionProvider)
);
const SessionChecker = dynamic(
  () => import('components/common/SessionChecker')
);
const DefaultSeo = dynamic<DefaultSeoProps>(() =>
  import('next-seo').then((mod) => mod.DefaultSeo)
);
const OnlineIndicator = dynamic(
  () => import('components/common/OnlineIndicator')
);

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const [refetchInterval, setRefetchInterval] = useState<number>(0);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
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
              {getLayout(<Component {...pageProps} />)}
              <OnlineIndicator />
              <ReactQueryDevtools />
            </RecoilRoot>
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
