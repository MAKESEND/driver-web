import type { Dispatch, FC, SetStateAction } from 'react';
import type { ParcelMixin } from 'types';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { sortingRoundState } from 'states';
import { useTranslation } from 'next-i18next';
import { Autocomplete, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';

export interface SortingFilterProps {
  setSelectedParcel?: Dispatch<SetStateAction<ParcelMixin | null>>;
  sortingList?: ParcelMixin[];
}

const filterOptions = createFilterOptions<ParcelMixin>({
  stringify: (option) =>
    Object.values(option)
      ?.map((item) => JSON.stringify(item))
      .join(),
});

export const SortingFilter: FC<SortingFilterProps> = ({
  setSelectedParcel = () => console.warn('no setter to SortingFilter'),
  sortingList = [],
}) => {
  const { t } = useTranslation('sorting');
  const [rounds, setRounds] = useRecoilState(sortingRoundState);
  const [parcels, setParcels] = useState(sortingList);

  useEffect(() => {
    sortingList.filter((parcel) =>
      rounds.some((round) => round === parcel.round)
    );
  }, [sortingList, rounds]);

  useEffect(() => {
    return () => setParcels([]);
  }, []);

  return (
    <>
      <Autocomplete
        sx={{ width: '100%' }}
        disablePortal
        options={parcels}
        blurOnSelect
        filterOptions={filterOptions}
        getOptionLabel={(option) =>
          `${option?.trackingID ?? ''} ${option?.receiverName ?? ''}`
        }
        groupBy={(option) =>
          t('round') + option?.round?.toString() ?? t('unknown')
        }
        renderInput={(params) => <TextField {...params} label={t('Parcels')} />}
        onChange={(_event, value) => setSelectedParcel(value)}
      />
    </>
  );
};

export default SortingFilter;
