import type { SxProps, Theme } from '@mui/material';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useWindowSize } from 'react-use';
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
  const breakPoint = theme.layout.size.drawerBreakpoint;

  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => setOpenDrawer((oldVal) => !oldVal);

  useEffect(() => {
    if (width > breakPoint) {
      setOpenDrawer(true);
      setIsMobile(false);
    }
  }, [width, breakPoint]);

  return (
    <>
      <DrawerSideNav
        open={openDrawer}
        breakPoint={breakPoint}
        onClose={() => setOpenDrawer(false)}
        screenWidth={width}
      />
      <DrawerTopNav
        open={openDrawer}
        isMobile={isMobile}
        onClick={toggleDrawer}
        hideOnScroll={hideOnScroll}
      />
      <DrawerHeader />
      <DrawerMain
        component="main"
        open={openDrawer}
        isMobile={isMobile}
        fillContainer={fillContainer}
        sx={sxMain}
      >
        {mobileContainer ? (
          <MobileContainer sx={{ ...sxMobile, p: 2 }}>
            {children}
          </MobileContainer>
        ) : (
          children
        )}
      </DrawerMain>
    </>
  );
};

export default DrawerLayout;
