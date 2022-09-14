import type { Dispatch, ReactNode, SetStateAction, ChangeEvent } from 'react';
import type { SxProps } from '@mui/material';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { pickupRoundState } from 'states';
import { rounds } from 'utils/constants/delivery';
import FilterOptions from 'components/FilterOptions';
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

export interface TaskFilterProps<T> {
  tasks?: T[];
  setter?: Dispatch<SetStateAction<T[]>>;
  fuse: Fuse<T>;
  inputLabel?: string;
  filter?: boolean;
  filterCallback?: () => boolean;
  scan?: boolean;
  href?: string;
  wrapperSxProps?: SxProps;
  sticky?: boolean;
}

export const TaskFilter = <T extends unknown>({
  tasks = [],
  setter = () => console.warn('no setter is given to TaskFilter'),
  fuse,
  inputLabel = '',
  filter = false,
  filterCallback = () => false,
  scan = false,
  href = '/',
  wrapperSxProps,
  sticky = false,
}: TaskFilterProps<T>): ReactNode => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<T[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedRounds, setSelectedRounds] = useRecoilState(pickupRoundState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };
  const onClear = () => setSearchVal('');
  const openFilterMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const closeFilterMenu = () => setAnchorEl(null);

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
  }, [tasks]);

  useEffect(() => {
    const filteredTasks = fusedParcels.filter(filterCallback);

    setter(filteredTasks);
  }, [fusedParcels, setter, filterCallback]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        width: '100%',
        backgroundColor: (theme) => theme.palette.white.main,
        paddingY: '0.875rem',
        ...(sticky && {
          position: 'sticky',
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer,
        }),
        ...wrapperSxProps,
      }}
    >
      <TextField
        id="parcel-filter"
        label={inputLabel}
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
      {filter && (
        <>
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
        </>
      )}
      {scan && (
        <Link href={href as unknown as URL} passHref>
          <Button variant="outlined" size="small" sx={{ minWidth: '1rem' }}>
            <QrCodeScannerIcon />
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default TaskFilter;
