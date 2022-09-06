import '../styles/globals.css';
import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { DefaultSeoProps } from 'next-seo';

import { useState } from 'react';
import { DefaultSeoConfig } from 'next-seo.config';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from 'styles';
import { QueryClient, QueryClientProvider } from 'react-query';

import dynamic from 'next/dynamic';
const DefaultSeo = dynamic<DefaultSeoProps>(() =>
  import('next-seo').then((mod) => mod.DefaultSeo)
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
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <DefaultSeo {...DefaultSeoConfig} />
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
