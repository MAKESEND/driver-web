import type { FC } from 'react';
import type { Parcel } from 'types';
import { Box, Chip, Typography, styled } from '@mui/material';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const SnowFlake = dynamic(() => import('@mui/icons-material/AcUnit'), {
  ssr: false,
});
const InventoryIcon = dynamic(
  () => import('@mui/icons-material/Inventory2Outlined'),
  { ssr: false }
);

const Row = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Secondary = styled(Typography)(() => ({
  color: 'rgba(0,0,0,0.6)',
  fontSize: '0.875rem',
}));

export interface PickupCardContentProps {
  parcel: Parcel;
}

export const PickupCardContent: FC<PickupCardContentProps> = ({
  parcel: {
    shipmentID,
    temp,
    status,
    receiver_name,
    receiver_no,
    dropoff_district,
    dropoff_postcode,
  },
}) => {
  const { t } = useTranslation('tasks');

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: (t) => t.spacing(1),
        display: 'flex',
        gap: (t) => t.spacing(1),
        flexDirection: 'column',
      }}
    >
      <Row>
        <Typography>{shipmentID}</Typography>
        <Chip label={status} />
      </Row>
      <Secondary sx={{ textAlign: 'start' }}>
        {t('label.name')}: {receiver_name}
      </Secondary>
      <Row>
        <Secondary>
          {t('label.phone')}: {receiver_no}
        </Secondary>
        {temp === 1 ? (
          <SnowFlake sx={{ color: '#488FEF' }} />
        ) : (
          <InventoryIcon sx={{ color: '#777' }} />
        )}
      </Row>
      <Row>
        <Secondary>
          {t('label.district')}: {dropoff_district}
        </Secondary>
        <Secondary>{dropoff_postcode}</Secondary>
      </Row>
    </Box>
  );
};

export default PickupCardContent;
