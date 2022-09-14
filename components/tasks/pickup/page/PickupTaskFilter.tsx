import type { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import type { PickupTask } from 'types';
import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { pickupRoundState } from 'states';
import FilterOptions from 'components/FilterOptions';
import { pickupTaskProps, rounds } from 'utils/constants/delivery';
import Fuse from 'fuse.js';
import { Box, Button, Menu, IconButton } from '@mui/material';

import dynamic from 'next/dynamic';
const TextField = dynamic(() => import('@mui/material/TextField'));
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));

export interface PickupTaskFilterProps {
  pickupTasks?: PickupTask[];
  setter?: Dispatch<SetStateAction<PickupTask[]>>;
  scan?: boolean;
}

export const PickupTaskFilter: FC<PickupTaskFilterProps> = ({
  pickupTasks = [],
  setter = () => console.warn('no setter given to PickupTaskFilter'),
  scan = false,
}) => {
  const { t } = useTranslation('tasks');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<PickupTask[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedRounds, setSelectedRounds] = useRecoilState(pickupRoundState);
  const fuse = useMemo(
    () => new Fuse(pickupTasks, { keys: pickupTaskProps }),
    [pickupTasks]
  );

  const onClear = () => setSearchVal('');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  useEffect(() => {
    if (!searchVal) return setFusedParcels(pickupTasks);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const result = fuse.search(searchVal);
      const parcels = result.map(({ item }) => item);
      setFusedParcels(parcels);
    }, 300);

    return () => clearTimeout(timeoutRef.current);
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
        paddingY: '0.875rem',
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
          ...(searchVal && {
            endAdornment: (
              <IconButton
                aria-label="clear search input"
                edge="end"
                onClick={onClear}
              >
                <ClearIcon />
              </IconButton>
            ),
          }),
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
      {scan && (
        <Link href="/scanner?type=pickup" passHref>
          <Button variant="outlined" size="small" sx={{ minWidth: '1rem' }}>
            <QrCodeScannerIcon />
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default PickupTaskFilter;