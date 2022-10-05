import { Box, styled } from '@mui/material';

export const FlexCenterBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default FlexCenterBox;
