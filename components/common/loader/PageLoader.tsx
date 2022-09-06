import type { FC } from 'react';
import { Box as MuiBox, Fade, styled } from '@mui/material';
import Loader from './Loader';

const Box = styled(MuiBox)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: theme.zIndex.drawer + 10, // should be put to portal
}));

interface PageLoaderProps {
  isLoading?: boolean;
}

export const PageLoader: FC<PageLoaderProps> = ({ isLoading = false }) => {
  return (
    <Fade in={isLoading} unmountOnExit>
      <Box>
        <Loader />
      </Box>
    </Fade>
  );
};

export default PageLoader;
