import { styled, Box } from '@mui/material';

export const MobileContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: theme.spacing(68), // 544px
  margin: '0 auto',
}));

export default MobileContainer;
