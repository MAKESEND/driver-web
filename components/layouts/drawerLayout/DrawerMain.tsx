import { Box, styled } from '@mui/material';

export const DrawerMain = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'open' && prop !== 'isMobile' && prop !== 'fillContainer',
})<{
  open?: boolean;
  isMobile?: boolean;
  fillContainer?: boolean;
}>(({ theme, open = false, isMobile = true, fillContainer = false }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(fillContainer && {
    [theme.breakpoints.up('xs')]: {
      height: 'calc(100vh - 56px)',
      // height: '100vh',
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
      // height: '100vh',
    },
  }),
  ...(open && {
    marginLeft: isMobile ? 0 : theme.layout.size.drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default DrawerMain;
