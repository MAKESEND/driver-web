import type { FC, ReactNode } from 'react';
import type { SxProps } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import DrawerMain from './DrawerMain';

import dynamic from 'next/dynamic';
const DrawerTopNav = dynamic(() => import('./DrawerTopNav'));
const DrawerHeader = dynamic(() => import('./DrawerHeader'));
const DrawerSideNav = dynamic(() => import('./DrawerSideNav/DrawerSideNav'), {
  ssr: false,
});

export interface DrawerLayout {
  children: ReactNode;
  fillContainer?: boolean;
  sxMain?: SxProps;
}

const drawerWidth = '16rem';
const breakPoint = 900;

export const DrawerLayout: FC<DrawerLayout> = ({
  children,
  fillContainer = false,
  sxMain = {},
}) => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpenDrawer((oldVal) => !oldVal);
  }, []);

  useEffect(() => {
    if (width > breakPoint) {
      setOpenDrawer(true);
      setIsMobile(false);
    }

    return () => {
      setOpenDrawer(false);
      setIsMobile(true);
    };
  }, [width]);

  return (
    <>
      <DrawerTopNav
        open={openDrawer}
        isMobile={isMobile}
        onClick={toggleDrawer}
      />
      <DrawerSideNav
        open={openDrawer}
        drawerWidth={drawerWidth}
        breakPoint={breakPoint}
        onClose={() => setOpenDrawer(false)}
        screenWidth={width}
      />
      <DrawerHeader />
      <DrawerMain
        component="main"
        open={openDrawer}
        drawerWidth={drawerWidth}
        isMobile={isMobile}
        fillContainer={fillContainer}
        sx={sxMain}
      >
        {children}
      </DrawerMain>
    </>
  );
};

export default DrawerLayout;
