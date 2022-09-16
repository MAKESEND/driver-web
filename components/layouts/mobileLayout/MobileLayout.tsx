import type { FC, ReactNode } from 'react';
import type { SxProps } from '@mui/material';
import { Box, styled } from '@mui/material';
import MobileTopNav from './MobileTopNav';

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fillContainer',
})<{ fillContainer?: boolean }>(({ theme, fillContainer = false }) => ({
  ...(fillContainer && {
    [theme.breakpoints.up('xs')]: {
      height: 'calc(100vh - 56px)',
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
    },
  }),
}));

interface MobileLayoutProps {
  children?: ReactNode;
  fillContainer?: boolean;
  hideOnScroll?: boolean;
  redirectPath?: string;
  sxProps?: SxProps;
}

export const Layout: FC<MobileLayoutProps> = ({
  children,
  fillContainer = false,
  hideOnScroll = false,
  redirectPath,
  sxProps,
}) => {
  return (
    <>
      <MobileTopNav
        hideOnScroll={hideOnScroll}
        redirectPath={redirectPath}
        sxProps={sxProps}
      />
      <MainContent component="main" fillContainer={fillContainer}>
        {children}
      </MainContent>
    </>
  );
};

export default Layout;
