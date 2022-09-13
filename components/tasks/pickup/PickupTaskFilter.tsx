import type { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import type { PickupTask } from 'types';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { pickupRoundState } from 'states';
import { rounds } from 'utils/constants/delivery';
import FilterOptions from 'components/FilterOptions';
import { pickupTaskProps } from 'utils/constants/delivery';
import Fuse from 'fuse.js';
import { Box, Button, TextField, Menu, IconButton } from '@mui/material';

import dynamic from 'next/dynamic';
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));

interface PickupTaskFilterProps {
  pickupTasks?: PickupTask[];
  setter?: Dispatch<SetStateAction<PickupTask[]>>;
}

export const PickupTaskFilter: FC<PickupTaskFilterProps> = ({
  pickupTasks = [],
  setter = () => console.warn('no setter given to PickupTaskFilter'),
}) => {
  const { t } = useTranslation('tasks');
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<PickupTask[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedRounds, setSelectedRounds] = useRecoilState(pickupRoundState);
  const fuse = useMemo(
    () => new Fuse(pickupTasks, { keys: pickupTaskProps }),
    [pickupTasks]
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchVal(search);
  };

  const onClear = () => setSearchVal('');

  useEffect(() => {
    if (!searchVal) return setFusedParcels(pickupTasks);

    const result = fuse.search(searchVal);
    const parcels = result.map(({ item }) => item);
    setFusedParcels(parcels);
  }, [fuse, pickupTasks, searchVal]);

  useEffect(() => {
    setFusedParcels(pickupTasks);
  }, [pickupTasks]);

  useEffect(() => {
    const filteredTasks = fusedParcels.filter((task) =>
      selectedRounds.some((round) => round === +task.round)
    );

    setter(filteredTasks);
  }, [fusedParcels, selectedRounds, setter]);

  const openFilterMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const closeFilterMenu = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        gap: '1rem',
        width: '100%',
        backgroundColor: (theme) => theme.palette.white.main,
        zIndex: (theme) => theme.zIndex.drawer,
        paddingY: '0.425rem',
      }}
    >
      <TextField
        id="parcel-filter"
        label={t('label.searchParcel')}
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1 }}
        value={searchVal}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="clear search input"
              edge="end"
              onClick={onClear}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
      <Button
        onClick={openFilterMenu}
        variant="outlined"
        size="small"
        sx={{ minWidth: '1rem' }}
      >
        <FilterIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={closeFilterMenu}>
        {rounds.map((round) => (
          <FilterOptions.Round
            key={round}
            option={round}
            selectedRounds={selectedRounds}
            setSelectedRounds={setSelectedRounds}
          />
        ))}
      </Menu>
      <Link href="/scanner?type=pickup" passHref>
        <Button variant="outlined" size="small" sx={{ minWidth: '1rem' }}>
          <QrCodeScannerIcon />
        </Button>
      </Link>
    </Box>
  );
};

export default PickupTaskFilter;
