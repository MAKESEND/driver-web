import { styled, Box } from '@mui/material';

export const MobileContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  maxWidth: theme.layout.size.portMaxWidth,
  margin: '0 auto',
}));

export default MobileContainer;
