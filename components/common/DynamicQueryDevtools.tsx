import type { FC } from 'react';
import getConfig from 'next/config';
import { ReactQueryDevtools } from 'react-query/devtools';

const {
  publicRuntimeConfig: { local },
} = getConfig();

export const DynamicQueryDevtools: FC = () => {
  return local ? <ReactQueryDevtools /> : null;
};

export default DynamicQueryDevtools;
