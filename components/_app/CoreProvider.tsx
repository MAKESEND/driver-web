import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import {
  QueryClient as ReactQueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DefaultSeo } from 'next-seo';
import { DefaultSeoConfig } from 'next-seo.config';
import SessionProvider from './SessionProvider';
import ModalProvider from './ModalProvider';
import ToastProvider from './ToastProvider';
import OnlineIndicator from './OnlineIndicator';
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
            <SessionProvider>
              <ModalProvider>
                <ToastProvider>
                  <DefaultSeo {...DefaultSeoConfig} />
                  <CssBaseline />
                  <RouteLoader>{children}</RouteLoader>
                  <OnlineIndicator />
                  <ReactQueryDevtools />
                </ToastProvider>
              </ModalProvider>
            </SessionProvider>
          </RecoilRoot>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default CoreProvider;
