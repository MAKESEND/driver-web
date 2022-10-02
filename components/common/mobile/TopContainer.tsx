import { Box, styled } from '@mui/material';

export const TopContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sticky',
})<{ sticky?: boolean }>(({ sticky = false, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: `${theme.spacing(1)} 0`,
  ...(sticky && {
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.drawer,
    backgroundColor: theme.palette.white.main,
  }),
}));

export default TopContainer;
