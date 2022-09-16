import type { FC } from 'react';
import type { SxProps } from '@mui/material';
import { useRouter } from 'next/router';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { DrawerHeader } from '../drawerLayout/DrawerHeader';
import { AppBar, Toolbar, IconButton, Slide } from '@mui/material';

import dynamic from 'next/dynamic';
const ChevronLeftIcon = dynamic(
  () => import('@mui/icons-material/ChevronLeft')
);

export interface MobileTopNavProps {
  hideOnScroll?: boolean;
  redirectPath?: string;
  sxProps?: SxProps;
}

export const MobileTopNav: FC<MobileTopNavProps> = ({
  hideOnScroll = false,
  redirectPath,
  sxProps,
}) => {
  const router = useRouter();
  const isScrolling = useScrollTrigger();

  return (
    <>
      <Slide in={!(hideOnScroll && isScrolling)}>
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
      </Slide>
      <DrawerHeader />
    </>
  );
};

export default MobileTopNav;
