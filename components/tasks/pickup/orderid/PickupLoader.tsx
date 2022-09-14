import type { FC } from 'react';
import { Box } from '@mui/material';
import { Loader } from 'components/common/loader/Loader';

export const PickupLoader: FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loader />
    </Box>
  );
};

export default PickupLoader;
