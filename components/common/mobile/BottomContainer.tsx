import { styled } from '@mui/material';
import MobileContainer from './MobileContainer';

export const BottomContainer = styled(MobileContainer, {
  shouldForwardProp: (prop) => prop !== 'float',
})<{ float?: boolean }>(({ float = false, theme }) => ({
  margin: '0 auto',
  ...(float && {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%)',
    p: 2,
    zIndex: theme.zIndex.drawer,
  }),
}));

export default BottomContainer;
