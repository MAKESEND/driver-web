import type { FC, ReactNode } from 'react';
import DrawerLayout from './drawerLayout/DrawerLayout';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  return <DrawerLayout {...props}>{children}</DrawerLayout>;
};

export default Layout;
