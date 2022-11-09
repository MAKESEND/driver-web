import { Box as MuiBox, Fade, styled } from '@mui/material';
import MSDeliveryLoader from './delivery/MSDeliveryLoader';

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
  children?: React.ReactNode;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = false,
  children,
}) => {
  return (
    <Fade in={isLoading} unmountOnExit>
      <Box>{children ?? <MSDeliveryLoader />}</Box>
    </Fade>
  );
};

export default PageLoader;
