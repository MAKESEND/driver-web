import type { FC, ReactNode } from 'react';
import type { SxProps } from '@mui/material';
import { useRouter } from 'next/router';
import { AppBar, Box, Toolbar, IconButton, styled } from '@mui/material';
import { DrawerHeader } from '../drawerLayout/DrawerHeader';

import dynamic from 'next/dynamic';
const ChevronLeftIcon = dynamic(
  () => import('@mui/icons-material/ChevronLeft')
);

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
  redirectPath?: string;
  sxProps?: SxProps;
}

export const Layout: FC<MobileLayoutProps> = ({
  children,
  fillContainer = false,
  redirectPath,
  sxProps,
}) => {
  const router = useRouter();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: '#fff', ...sxProps }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="back"
            onClick={() => {
              redirectPath ? router.push(redirectPath) : router.back();
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DrawerHeader />
      <MainContent component="main" fillContainer={fillContainer}>
        {children}
      </MainContent>
    </>
  );
};

export default Layout;
