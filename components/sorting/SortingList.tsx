import type { ParcelToSort, ParcelMixin, ParcelStatus } from 'types';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useUpdateParcelStatus } from 'hooks/useMutateData';
import ParcelCard from 'components/ParcelCard';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Stack,
} from '@mui/material';

import dynamic from 'next/dynamic';
const SortingFilter = dynamic(
  () => import('components/sorting/SortingFilter'),
  { ssr: false }
);

export interface SortingList {
  sortingList?: ParcelToSort[];
}

export const SortingList: React.FC<SortingList> = ({ sortingList = [] }) => {
  const { t } = useTranslation(['parcel', 'sorting']);
  const [parcel, setParcel] = useState<ParcelMixin | null>(null);
  const { mutate, isLoading } = useUpdateParcelStatus();

  const onClick = () => {
    if (parcel?.trackingID) {
      mutate({
        shipment: [
          {
            trackingID: parcel.trackingID,
            status: 'Sorted' as ParcelStatus,
          },
        ],
      });
    }
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        height: '100%',
        gap: 2.5,
      }}
    >
      <SortingFilter
        selectedParcel={parcel}
        setSelectedParcel={setParcel}
        sortingList={sortingList}
      />
      {parcel && (
        <Box sx={{ width: '100%' }}>
          <ParcelCard
            {...parcel}
            Note={
              <Typography sx={{ fontSize: '1.25rem' }}>{`${t('rack')}: ${
                parcel.rack
              } ${parcel.nickname} ${parcel.hub} - ${
                parcel.sequence
              }`}</Typography>
            }
            Actions={
              <Button
                variant="contained"
                disabled={isLoading}
                endIcon={
                  isLoading ? (
                    <CircularProgress size="1rem" sx={{ color: '#fff' }} />
                  ) : null
                }
                onClick={onClick}
              >
                {t('btn.sort', { ns: 'sorting' })}
              </Button>
            }
          />
        </Box>
      )}
    </Stack>
  );
};

export default SortingList;
