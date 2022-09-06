import type { FC } from 'react';
import Image from 'next/image';
import { Box, styled, Typography } from '@mui/material';

export interface DrawerSideHeadProps {
  placeholder?: string;
  imgSrc?: string;
  drawerWidth?: string;
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

export const DrawerSideHead: FC<DrawerSideHeadProps> = ({
  placeholder = 'Warehouse',
  imgSrc,
  drawerWidth = '16rem',
}) => {
  return (
    <Container
      sx={{
        height: { xs: '56px', sm: '64px' },
      }}
    >
      {imgSrc ? (
        <Image
          layout='responsive'
          width={drawerWidth}
          height='3rem'
          src={imgSrc}
          alt='logo'
        />
      ) : (
        <AppLogo variant='h1'>{placeholder}</AppLogo>
      )}
    </Container>
  );
};

export default DrawerSideHead;
