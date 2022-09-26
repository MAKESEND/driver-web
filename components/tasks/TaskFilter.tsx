import type { ParcelMixin } from 'types';
import type { InputProps, SxProps, Theme } from '@mui/material';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Box, Button, IconButton, Menu } from '@mui/material';
import { FilterOption } from 'components/FilterOptions';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const TextField = dynamic(() => import('@mui/material/TextField'));
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

export interface TaskFilterProps<T, R> {
  tasks?: T[];
  setFilteredTasks?: React.Dispatch<React.SetStateAction<T[]>>;
  sx?: SxProps<Theme>;
  InputProps?: InputProps;
  scan?: boolean;
  href?: string;
  fuseKeys?: Fuse.FuseOptionKey<T>[];
  filterOptions?: R[];
}

export const TaskFilter = <T extends ParcelMixin, R extends string>({
  tasks = [],
  setFilteredTasks = () =>
    console.warn('no setFilteredTasks given to DropoffTaskFilter'),
  sx,
  InputProps,
  scan = false,
  href = '/scanner',
  fuseKeys: keys = [],
  filterOptions = [],
}: TaskFilterProps<T, R>) => {
  const { t } = useTranslation('tasks');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<T[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<R[]>([]);
  const open = Boolean(anchorEl);
  const fuse = useMemo(() => new Fuse(tasks, { keys }), [tasks, keys]);

  const openFilterMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const closeFilterMenu = () => setAnchorEl(null);
  const onClear = () => setSearchVal('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  useEffect(() => {
    if (!searchVal) return setFusedParcels(tasks);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const result = fuse.search(searchVal);
      const parcels = result.map(({ item }) => item);
      setFusedParcels(parcels);
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [fuse, tasks, searchVal]);

  useEffect(() => {
    setFusedParcels(tasks);
    return () => setFusedParcels([]);
  }, [tasks]);

  useEffect(() => {
    if (!selectedStatus.length) {
      setFilteredTasks(tasks);
    } else {
      const filteredTasks = fusedParcels.filter((task) =>
        selectedStatus.some((status) => status === task.status)
      );
      setFilteredTasks(filteredTasks);
    }
  }, [tasks, fusedParcels, selectedStatus, setFilteredTasks]);

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
                aria-label="clear-search-input"
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
        {filterOptions.map((option) => (
          <FilterOption
            key={option}
            option={option}
            selectedOption={selectedStatus}
            setSelectedOption={setSelectedStatus}
            label={t(option)}
          />
        ))}
      </Menu>
      {scan && (
        <Link href={href} passHref>
          <Button variant="outlined" size="small" sx={{ minWidth: '1rem' }}>
            <QrCodeScannerIcon />
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default TaskFilter;
