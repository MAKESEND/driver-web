import type { FC } from 'react';
import type { Parcel } from 'types';
import { useTranslation } from 'next-i18next';
import { Box, Chip, Typography, styled } from '@mui/material';

import dynamic from 'next/dynamic';
const SnowFlakeIcon = dynamic(
  () => import('components/common/icons/SnowFlakeIcon'),
  { ssr: false }
);
const InventoryIcon = dynamic(
  () => import('components/common/icons/InventoryIcon'),
  { ssr: false }
);

const Row = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
      <Typography variant="secondary" sx={{ textAlign: 'start' }}>
        {t('label.name')}: {receiver_name}
      </Typography>
      <Row>
        <Typography variant="secondary">
          {t('label.phone')}: {receiver_no}
        </Typography>
        {temp === 1 ? <SnowFlakeIcon /> : <InventoryIcon />}
      </Row>
      <Row>
        <Typography variant="secondary">
          {t('label.district')}: {dropoff_district}
        </Typography>
        <Typography variant="secondary">{dropoff_postcode}</Typography>
      </Row>
    </Box>
  );
};

export default PickupCardContent;
