import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { DefaultSeoProps } from 'next-seo';
import type { SessionProviderProps } from 'next-auth/react';

import { useState } from 'react';
import { DefaultSeoConfig } from 'next-seo.config';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from 'styles';

import dynamic from 'next/dynamic';
const RecoilRoot = dynamic(() => import('components/common/_app/RecoilRoot'));
const SessionProvider = dynamic<SessionProviderProps>(() =>
  import('next-auth/react').then((mod) => mod.SessionProvider)
);
const SessionChecker = dynamic(
  () => import('components/common/_app/SessionChecker')
);
const DefaultSeo = dynamic<DefaultSeoProps>(() =>
  import('next-seo').then((mod) => mod.DefaultSeo)
);
const OnlineIndicator = dynamic(
  () => import('components/common/_app/OnlineIndicator')
);
const RouteLoader = dynamic(
  () => import('components/common/loader/RouteLoader')
);
const ReactQueryDevtools = dynamic(
  () => import('components/common/_app/QueryDevtools')
);
const QueryClientProvider = dynamic(
  () => import('components/common/_app/QueryClientProvider')
);

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const [refetchInterval, setRefetchInterval] = useState<number>(0);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <SessionProvider
        session={session}
        refetchOnWindowFocus
        refetchInterval={refetchInterval}
      >
        <QueryClientProvider>
          <ThemeProvider theme={theme}>
            <RecoilRoot>
              <DefaultSeo {...DefaultSeoConfig} />
              <CssBaseline />
              <SessionChecker setter={setRefetchInterval} />
              <RouteLoader>
                {getLayout(<Component {...pageProps} />)}
              </RouteLoader>
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
