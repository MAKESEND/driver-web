import type { SxProps, Theme } from '@mui/material';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useWindowSize } from 'react-use';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import DrawerMain from './DrawerMain';
import DrawerHeader from './DrawerHeader';
import DrawerTopNav from './DrawerTopNav';
import DrawerSideNav from './DrawerSideNav/DrawerSideNav';
import MobileContainer from 'components/common/mobile/MobileContainer';
import { useTheme } from '@mui/material';

export interface DrawerLayout {
  children: React.ReactNode;
  fillContainer?: boolean;
  mobileContainer?: boolean;
  sxMain?: SxProps<Theme>;
  sxMobile?: SxProps<Theme>;
  hideOnScroll?: boolean;
}

export const DrawerLayout: React.FC<DrawerLayout> = ({
  children,
  fillContainer = false,
  mobileContainer = false,
  sxMain,
  sxMobile,
  hideOnScroll = false,
}) => {
  const theme = useTheme();
  const drawerWidth = theme.layout.size.drawerWidth;
  const breakPoint = theme.layout.size.drawerBreakpoint;

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
  }, [width, breakPoint]);

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
        {mobileContainer ? (
          <MobileContainer sx={sxMobile}>{children}</MobileContainer>
        ) : (
          children
        )}
      </DrawerMain>
    </>
  );
};

export default DrawerLayout;
