import type { FC, ReactNode } from 'react';
import { RecoilRoot as RecoilRootLib } from 'recoil';

export const RecoilRoot: FC<{ children: ReactNode }> = ({ children }) => {
  return <RecoilRootLib>{children}</RecoilRootLib>;
};

export default RecoilRoot;
