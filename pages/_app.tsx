import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import dynamic from 'next/dynamic';
const CoreProvider = dynamic(
  () => import('components/common/_app/CoreProvider')
);

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
  getLayout?: (page: React.ReactElement) => React.ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CoreProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </CoreProvider>
  );
}

export default appWithTranslation(MyApp);
