import DeliveryLoader from 'components/common/loader/delivery/DeliveryLoader';
import Image from 'components/common/StyledImage';
import { Box } from '@mui/material';

export const MSDeliveryLoader: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', mb: 10 }}>
      {<DeliveryLoader />}
      <Box
        sx={{
          position: 'absolute',
          width: '200px',
          height: '100px',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Image
          priority
          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/bxbwwosk6mzkk1vdukcs"
          alt="makesend_logo"
          layout="fill"
        />
      </Box>
    </Box>
  );
};

export default MSDeliveryLoader;
