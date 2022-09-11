import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';

interface MobileLayoutProps {
  children?: ReactNode;
}

export const Layout: FC<MobileLayoutProps> = ({ children, ...props }) => {
  return <Fragment {...props}> {children}</Fragment>;
};

export default Layout;
