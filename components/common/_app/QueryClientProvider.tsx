import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import {
  QueryClient as ReactQueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from 'react-query';

export const QueryClientProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new ReactQueryClient());

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
