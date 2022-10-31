import type { AutocompleteProps, Theme } from '@mui/material';
import type { ParcelMixin, Parcel, ParcelToSort } from 'types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { sortingRoundState } from 'states';
import { rounds } from 'utils/constants/delivery';
import { FilterOption } from 'components/FilterOptions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { Button, Grid, Menu, styled } from '@mui/material';

import dynamic from 'next/dynamic';
const TextField = dynamic(() => import('@mui/material/TextField'));
const Autocomplete = dynamic<
  AutocompleteProps<ParcelMixin, undefined, undefined, undefined>
>(() => import('@mui/material/Autocomplete'));
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

const IconButton = styled(Button)(({ theme }) => ({
  minWidth: theme.spacing(5),
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

export interface SortingFilterProps {
  selectedParcel?: ParcelMixin | null;
  setSelectedParcel?: React.Dispatch<React.SetStateAction<ParcelMixin | null>>;
  sortingList?: ParcelMixin[];
}

const filterOptions = createFilterOptions<ParcelMixin>({
  stringify: (option) =>
    Object.values(option)
      ?.map((item) => JSON.stringify(item))
      .join(),
});

export const SortingFilter: React.FC<SortingFilterProps> = ({
  selectedParcel = null,
  setSelectedParcel = () => console.warn('no setter to SortingFilter'),
  sortingList = [],
}) => {
  const { t } = useTranslation('sorting');
  const [parcels, setParcels] = useState(sortingList);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedRounds, setSelectedRounds] = useRecoilState(sortingRoundState);
  const breakpointSM = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm')
  );

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
    <Grid
      container
      justifyContent={{ xs: 'end', sm: 'center' }}
      spacing={{ xs: 1, sm: 0 }}
    >
      <Grid item xs={12} sm={10} sx={{ pr: 0.5 }}>
        <Autocomplete
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
          onChange={(_event, value) => setSelectedParcel(value)}
          renderInput={(params) => (
            <TextField {...params} label={t('Parcels')} />
          )}
        />
      </Grid>
      <Grid item xs={6} sm={1}>
        {breakpointSM ? (
          <IconButton variant="outlined" onClick={handleClick}>
            <FilterIcon />
          </IconButton>
        ) : (
          <Button
            fullWidth
            variant="outlined"
            endIcon={<FilterIcon />}
            onClick={handleClick}
          >
            {t('filter')}
          </Button>
        )}
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {rounds.map((round) => (
            <FilterOption
              key={round}
              option={round}
              selectedOption={selectedRounds}
              setSelectedOption={setSelectedRounds}
              label={`${t('round')} ${round}`}
            />
          ))}
        </Menu>
      </Grid>
      <Grid item xs={6} sm={1}>
        <Link href="/scanner?type=sorting" passHref>
          {breakpointSM ? (
            <IconButton variant="outlined">
              <QrCodeScannerIcon />
            </IconButton>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              endIcon={<QrCodeScannerIcon />}
            >
              {t('btn.scan')}
            </Button>
          )}
        </Link>
      </Grid>
    </Grid>
  );
};

export default SortingFilter;
