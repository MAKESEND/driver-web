import type { FC } from 'react';
import type { ParcelToSort, ParcelMixin } from 'types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Typography } from '@mui/material';
import MobileContainer from 'components/common/mobile/MobileContainer';
import SortingFilter from 'components/sorting/SortingFilter';
import ParcelCard from 'components/ParcelCard';

export interface SortingList {
  sortingList?: ParcelToSort[];
}

export const SortingList: FC<SortingList> = ({ sortingList = [] }) => {
  const { t } = useTranslation('parcel');
  const [parcel, setParcel] = useState<ParcelMixin | null>(null);

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
      }}
    >
      <SortingFilter setter={setParcel} />
      {parcel && (
        <Box sx={{ flexGrow: 1 }}>
          <ParcelCard
            {...parcel}
            HighLight={
              <Typography sx={{ fontSize: '1.25rem' }}>{`${t('rack')}: ${
                parcel.rack
              } ${parcel.nickname} ${parcel.hub} - ${
                parcel.sequence
              }`}</Typography>
            }
          />
        </Box>
      )}
    </MobileContainer>
  );
};

export default SortingList;
