import { styled } from '@mui/material';
import MobileContainer from './MobileContainer';

export const BottomContainer = styled(MobileContainer, {
  shouldForwardProp: (prop) => prop !== 'float',
})<{ float?: boolean }>(({ float = false, theme }) => ({
  width: '100%',
  maxWidth: theme.spacing(68), // 544px
  margin: '0 auto',
  ...(float && {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%)',
    padding: theme.spacing(2), // 16px
    zIndex: theme.zIndex.drawer,
  }),
}));

export default BottomContainer;
