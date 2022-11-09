import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import dynamic from 'next/dynamic';
const CoreProvider = dynamic(() => import('components/_app/CoreProvider'));
const OnlineIndicator = dynamic(
  () => import('components/_app/OnlineIndicator')
);

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
  getLayout?: (page: React.ReactElement) => React.ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CoreProvider dehydratedState={dehydratedState}>
      {getLayout(<Component {...pageProps} />)}
      <OnlineIndicator />
    </CoreProvider>
  );
}

export default appWithTranslation(MyApp);
