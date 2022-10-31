import type { SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import DrawerMain from 'components/layouts/drawerLayout/DrawerMain';
import DrawerHeader from 'components/layouts/drawerLayout/DrawerHeader';
import DrawerTopNav from 'components/layouts/drawerLayout/DrawerTopNav';
import DrawerSideNav from 'components/layouts/drawerLayout/DrawerSideNav/DrawerSideNav';
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
    const reachThreshold = width > breakPoint;
    setOpenDrawer(reachThreshold);
    setIsMobile(!reachThreshold);
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
