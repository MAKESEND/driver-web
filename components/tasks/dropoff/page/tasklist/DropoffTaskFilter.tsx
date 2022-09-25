import type { DropoffTask, ParcelStatus } from 'types';
import { InputProps, SxProps, Theme, Typography } from '@mui/material';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { dropoffTaskProps } from 'utils/constants/delivery';
import { dropoffTaskStatusFilters } from 'utils/constants/delivery';
import { Box, Button, IconButton, Menu } from '@mui/material';
import { FilterOption } from 'components/FilterOptions';

import dynamic from 'next/dynamic';
const TextField = dynamic(() => import('@mui/material/TextField'));
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

export interface DropoffTaskFilterProps {
  dropoffTasks?: DropoffTask[];
  setFilteredTasks?: React.Dispatch<React.SetStateAction<DropoffTask[]>>;
  sx?: SxProps<Theme>;
  InputProps?: InputProps;
  scan?: boolean;
}

export const DropoffTaskFilter: React.FC<DropoffTaskFilterProps> = ({
  dropoffTasks = [],
  setFilteredTasks = () =>
    console.warn('no setFilteredTasks given to DropoffTaskFilter'),
  sx,
  InputProps,
  scan = false,
}) => {
  const { t } = useTranslation('tasks');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<DropoffTask[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<ParcelStatus[]>([]);
  const open = Boolean(anchorEl);
  const fuse = useMemo(
    () => new Fuse(dropoffTasks, { keys: dropoffTaskProps }),
    [dropoffTasks]
  );

  const openFilterMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const closeFilterMenu = () => setAnchorEl(null);
  const onClear = () => setSearchVal('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  useEffect(() => {
    if (!searchVal) return setFusedParcels(dropoffTasks);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const result = fuse.search(searchVal);
      const parcels = result.map(({ item }) => item);
      setFusedParcels(parcels);
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [fuse, dropoffTasks, searchVal]);

  useEffect(() => {
    setFusedParcels(dropoffTasks);
    return () => setFusedParcels([]);
  }, [dropoffTasks]);

  useEffect(() => {
    if (!selectedStatus.length) {
      setFilteredTasks(dropoffTasks);
    } else {
      const filteredTasks = fusedParcels.filter((task) =>
        selectedStatus.some((status) => status === task.status)
      );
      setFilteredTasks(filteredTasks);
    }
  }, [dropoffTasks, fusedParcels, selectedStatus, setFilteredTasks]);

  return (
    <Box
      sx={{ width: '100%', display: 'flex', gap: (t) => t.spacing(1), ...sx }}
    >
      <TextField
        id="parcel-filter"
        label={t('label.searchParcel')}
        variant="outlined"
        size="small"
        value={searchVal}
        onChange={onChange}
        sx={{ flexGrow: 1 }}
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
          ...InputProps,
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
        {dropoffTaskStatusFilters.map((status) => (
          <FilterOption
            key={status}
            option={status}
            selectedOption={selectedStatus}
            setSelectedOption={setSelectedStatus}
            label={t(status)}
          />
        ))}
      </Menu>
      {scan && (
        <Link href="/scanner?type=dropoff" passHref>
          <Button variant="outlined" size="small" sx={{ minWidth: '1rem' }}>
            <QrCodeScannerIcon />
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default DropoffTaskFilter;
