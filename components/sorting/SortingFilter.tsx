import type { Dispatch, FC, SetStateAction } from 'react';
import type { ParcelMixin, Parcel, ParcelToSort } from 'types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Autocomplete, Box, Button, TextField, Menu } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { rounds } from 'utils/constants/delivery';
import FilterOptions from 'components/FilterOptions';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import { useRecoilState } from 'recoil';
import { sortingRoundState } from 'states';
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
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
  const [parcels, setParcels] = useState(sortingList);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedRounds, setSelectedRounds] = useRecoilState(sortingRoundState);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const groupBy = (option: Partial<Parcel & ParcelToSort>) => {
    const parcelCount = parcels.filter(
      (parcel) => parcel.round === option?.round
    ).length;
    return `${t('round')} ${option?.round?.toString()}: ${parcelCount} ${
      parcelCount > 1 ? t('parcels') : t('parcel')
    }`;
  };

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
        options={parcels.sort((a, b) => +(a?.round ?? 0) - +(b?.round ?? 0))}
        value={selectedParcel}
        size="small"
        blurOnSelect
        filterOptions={filterOptions}
        getOptionLabel={(option) =>
          `${option?.trackingID?.trim() ?? ''} ${
            option?.receiverName?.trim() ?? ''
          }`
        }
        groupBy={groupBy}
        renderInput={(params) => <TextField {...params} label={t('Parcels')} />}
        onChange={(_event, value) => setSelectedParcel(value)}
      />
      <Button
        onClick={handleClick}
        variant="outlined"
        size="small"
        sx={{ minWidth: '1rem' }}
      >
        <FilterIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {rounds.map((round) => (
          <FilterOptions.Round
            key={round}
            option={round}
            selectedRounds={selectedRounds}
            setSelectedRounds={setSelectedRounds}
          />
        ))}
      </Menu>
      <Link href="/scanner?type=sorting" passHref>
        <Button variant="outlined" size="small" sx={{ minWidth: '1rem' }}>
          <QrCodeScannerIcon />
        </Button>
      </Link>
    </Box>
  );
};

export default SortingFilter;
