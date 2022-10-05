import type { ParcelToSort, ParcelMixin, ParcelStatus } from 'types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import MobileContainer from 'components/common/mobile/MobileContainer';
import SortingFilter from 'components/sorting/SortingFilter';
import ParcelCard from 'components/ParcelCard';
import { useUpdateParcelStatus } from 'hooks/useMutateData';

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

  useEffect(() => {
    return () => setParcel(null);
  }, []);

  return (
    <MobileContainer
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        gap: '1.25rem',
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
    </MobileContainer>
  );
};

export default SortingList;
