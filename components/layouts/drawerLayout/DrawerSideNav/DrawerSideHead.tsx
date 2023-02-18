import Image from 'next/image';
import { Box, styled, Typography } from '@mui/material';

export interface DrawerSideHeadProps {
  placeholder?: string;
  imgSrc?: string;
  drawerWidth?: number;
}

const Container = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const AppLogo = styled(Typography)(() => ({
  fontSize: '2rem',
  fontWeight: 600,
  textAlign: 'center',
}));

export const DrawerSideHead: React.FC<DrawerSideHeadProps> = ({
  placeholder = 'MAKESEND',
  imgSrc,
  drawerWidth = 256,
}) => {
  return (
    <Container sx={{ height: { xs: '56px', sm: '64px' } }}>
      {imgSrc ? (
        <Image width={drawerWidth} height={48} src={imgSrc} alt="logo" />
      ) : (
        <AppLogo variant="h1">{placeholder}</AppLogo>
      )}
    </Container>
  );
};

export default DrawerSideHead;
