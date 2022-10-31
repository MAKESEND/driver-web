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
  sticky?: boolean;
  tasks?: T[];
  setFilteredTasks?: React.Dispatch<React.SetStateAction<T[]>>;
  sx?: SxProps<Theme>;
  InputProps?: InputProps;
  scan?: boolean;
  href?: string;
  fuseKeys?: Fuse.FuseOptionKey<T>[];
  filterKey?: keyof T;
  filterOptions?: R[];
  label?: string;
}

export const TaskFilter = <T, R>({
  sticky = false,
  tasks = [],
  setFilteredTasks = () =>
    console.warn('no setFilteredTasks given to DropoffTaskFilter'),
  sx,
  InputProps,
  scan = false,
  href = '/scanner',
  fuseKeys: keys = [],
  filterKey = '' as keyof T,
  filterOptions = [],
  label,
}: TaskFilterProps<T, R>) => {
  const { t } = useTranslation('tasks');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<T[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<R[]>([]);
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
    if (!selectedOption.length) {
      setFilteredTasks(fusedParcels);
    } else {
      const filteredTasks = fusedParcels.filter((task) =>
        selectedOption.some(
          (Option) => String(Option) === String(task[filterKey])
        )
      );
      setFilteredTasks(filteredTasks);
    }
  }, [tasks, filterKey, fusedParcels, selectedOption, setFilteredTasks]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: 1,
        ...sx,
        ...(sticky && {
          position: 'sticky',
          top: 0,
          py: 1,
          bgcolor: (theme) => theme.palette.white.main,
          zIndex: (theme) => theme.zIndex.drawer,
        }),
      }}
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
          sx: { height: (theme) => theme.spacing(5) },
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
        sx={{
          minWidth: (theme) => theme.spacing(5),
          height: (theme) => theme.spacing(5),
        }}
      >
        <FilterIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={closeFilterMenu}>
        {filterOptions.map((option) => (
          <FilterOption
            key={option as unknown as string}
            option={option}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            label={
              label ? `${label} ${option}` : t(option as unknown as string)
            }
          />
        ))}
      </Menu>
      {scan && (
        <Link href={href} passHref>
          <Button
            size="small"
            variant="outlined"
            sx={{
              minWidth: (theme) => theme.spacing(5),
              height: (theme) => theme.spacing(5),
            }}
          >
            <QrCodeScannerIcon />
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default TaskFilter;
