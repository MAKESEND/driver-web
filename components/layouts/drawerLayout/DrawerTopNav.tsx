import type { AppBarProps } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import FlexSpacer from 'components/common/FlexSpacer';
import SearchBar from 'components/common/SearchBar';
import Notifications from './DrawerTopNav/Notifications';
import {
  styled,
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from '@mui/material';

import dynamic from 'next/dynamic';
const MenuIcon = dynamic(() => import('@mui/icons-material/Menu'));

export interface DrawerTopNavProps {
  open?: boolean;
  isMobile?: boolean;
  hideOnScroll?: boolean;
  position?: string;
  isScrolling?: boolean;
  onClick?: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})<DrawerTopNavProps>(({ theme, open = false, isMobile = true }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: isMobile
      ? '100%'
      : `calc(100% - ${theme.layout.size.drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerTopNav: React.FC<DrawerTopNavProps> = ({
  open = false,
  isMobile = true,
  hideOnScroll = false,
  position = 'fixed',
  isScrolling = false,
  onClick = () => console.warn('no callback giving to DrawerTopNav'),
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [onPath, setOnPath] = useState<string>('');

  useEffect(() => {
    const paths = router.pathname.split('/').join('.');
    setOnPath(paths);
  }, [router.pathname]);

  return (
    <Slide in={!(hideOnScroll && isScrolling)}>
      <AppBar
        open={open}
        position={position as AppBarProps['position']}
        isMobile={isMobile}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography fontSize="2rem" fontWeight={600}>
            {t(`links${onPath}`)}
          </Typography>
          <FlexSpacer />
          <SearchBar isMobile={isMobile} />
          <Box sx={{ display: 'flex' }}>
            <Notifications />
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default DrawerTopNav;
