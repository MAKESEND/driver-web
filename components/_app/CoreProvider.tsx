import { useState } from 'react';
import {
  QueryClient as ReactQueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { DefaultSeo } from 'next-seo';
import { DefaultSeoConfig } from 'next-seo.config';
import SessionProvider from 'components/_app/SessionProvider';
import ToastProvider from 'components/_app/ToastProvider';
import ModalProvider from 'components/_app/ModalProvider';
import RouteLoader from 'components/common/loader/RouteLoader';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from 'styles/theme';

export const CoreProvider: React.FC<{
  children?: React.ReactNode;
  dehydratedState: any;
}> = ({ children, dehydratedState }) => {
  const [queryClient] = useState(() => new ReactQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <ModalProvider>
              <ToastProvider>
                <SessionProvider>
                  <DefaultSeo {...DefaultSeoConfig} />
                  <CssBaseline />
                  <RouteLoader>{children}</RouteLoader>
                  <ReactQueryDevtools />
                </SessionProvider>
              </ToastProvider>
            </ModalProvider>
          </RecoilRoot>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default CoreProvider;
