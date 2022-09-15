import { FC, ReactNode, useLayoutEffect } from 'react';
import type { SxProps } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useWindowSize } from 'react-use';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import DrawerMain from './DrawerMain';
import DrawerHeader from './DrawerHeader';

import dynamic from 'next/dynamic';
const DrawerTopNav = dynamic(() => import('./DrawerTopNav'));
// const DrawerHeader = dynamic(() => import('./DrawerHeader'));
const DrawerSideNav = dynamic(() => import('./DrawerSideNav/DrawerSideNav'), {
  ssr: false,
});

export interface DrawerLayout {
  children: ReactNode;
  fillContainer?: boolean;
  sxMain?: SxProps;
  hideOnScroll?: boolean;
}

const drawerWidth = '16rem';
const breakPoint = 900;

export const DrawerLayout: FC<DrawerLayout> = ({
  children,
  fillContainer = false,
  sxMain = {},
  hideOnScroll = false,
}) => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const mainRef = useRef();
  const [container, setContainer] = useState<HTMLElement>();
  const trigger = useScrollTrigger({ target: container });

  const toggleDrawer = () => setOpenDrawer((oldVal) => !oldVal);

  useLayoutEffect(() => {
    setContainer(mainRef.current);
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
        hideOnScroll={hideOnScroll}
        isScrolling={trigger}
      />
      <DrawerHeader />
      <DrawerSideNav
        open={openDrawer}
        drawerWidth={drawerWidth}
        breakPoint={breakPoint}
        onClose={() => setOpenDrawer(false)}
        screenWidth={width}
      />
      <DrawerMain
        component="main"
        open={openDrawer}
        drawerWidth={drawerWidth}
        isMobile={isMobile}
        fillContainer={fillContainer}
        sx={sxMain}
        ref={mainRef}
      >
        {children}
      </DrawerMain>
    </>
  );
};

export default DrawerLayout;
