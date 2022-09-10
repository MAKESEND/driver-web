import type { Dispatch, FC, SetStateAction } from 'react';
import type { ParcelMixin } from 'types';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { sortingRoundState } from 'states';
import { useTranslation } from 'next-i18next';
import { Autocomplete, Box, IconButton, TextField, Menu } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { rounds } from 'utils/constants/delivery';
import FilterOptions from 'components/sorting/SortingFilterOptions';

import dynamic from 'next/dynamic';
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);

export interface SortingFilterProps {
  selectedParcel?: ParcelMixin | null;
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
  selectedParcel = null,
  setSelectedParcel = () => console.warn('no setter to SortingFilter'),
  sortingList = [],
}) => {
  const { t } = useTranslation('sorting');
  const selectedRounds = useRecoilValue(sortingRoundState);
  const [parcels, setParcels] = useState(sortingList);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const filteredList = sortingList.filter((parcel) =>
      selectedRounds.some((round) => round === parcel.round)
    );
    setParcels(filteredList);

    // keep selection if it's in the list
    // otherwise, remove it
    const isInList = filteredList.some(
      (parcel) => parcel.trackingID === selectedParcel?.trackingID
    );
    if (!isInList) {
      setSelectedParcel(null);
    }
  }, [sortingList, selectedRounds, selectedParcel, setSelectedParcel]);

  useEffect(() => {
    return () => setParcels([]);
  }, []);

  return (
    <Box sx={{ display: 'flex', gap: '1rem', width: '100%' }}>
      <Autocomplete
        sx={{ flexGrow: 1 }}
        disablePortal
        disableCloseOnSelect
        options={parcels}
        value={selectedParcel}
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
      <IconButton onClick={handleClick}>
        <FilterIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {rounds.map((round) => (
          <FilterOptions.Round key={round} option={round} />
        ))}
      </Menu>
    </Box>
  );
};

export default SortingFilter;
