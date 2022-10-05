import type { DropoffTask } from 'types';
import { memo } from 'react';
import { Box, Chip, Grid, Stack, Typography, styled } from '@mui/material';

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
  overflow: 'auto',
}));

export interface CollectlistCardContentProps {
  parcel: DropoffTask;
}

export const CollectlistCardContent: React.FC<CollectlistCardContentProps> = ({
  parcel,
}) => {
  const {
    status,
    temp,
    trackingID,
    dropAddress,
    dropDistrict,
    dropProvince,
    dropPostcode,
  } = parcel;

  return (
    <Stack sx={{ width: '100%', overflow: 'auto', gap: (t) => t.spacing(0.5) }}>
      <Row>
        <Typography>{trackingID}</Typography>
        <Chip label={status} />
      </Row>
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Grid item>
          <Typography>{dropDistrict}</Typography>
        </Grid>
        <Grid item>
          <Typography>{dropProvince}</Typography>
        </Grid>
        <Grid item>
          <Typography>{dropPostcode}</Typography>
        </Grid>
      </Grid>
      <Row sx={{ gap: (t) => t.spacing(1) }}>
        <Typography variant="secondary">{dropAddress}</Typography>
        {+temp === 1 ? <SnowFlakeIcon /> : <InventoryIcon />}
      </Row>
    </Stack>
  );
};

export const MemoizedCollectlistCardContent = memo(CollectlistCardContent);

export default MemoizedCollectlistCardContent;
