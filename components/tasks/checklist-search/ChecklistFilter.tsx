import type { ParcelMixin } from 'types';
import type { SxProps } from '@mui/material';
import { useState, useEffect, useMemo, useRef } from 'react';
import Fuse from 'fuse.js';
import { useTranslation } from 'next-i18next';
import { IconButton } from '@mui/material';

import dynamic from 'next/dynamic';
const TextField = dynamic(() => import('@mui/material/TextField'));
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));

export interface ChecklistFilterProps<T> {
  parcels: T[];
  setter?: React.Dispatch<React.SetStateAction<T[]>>;
  wrapperSx?: SxProps;
  inputSx?: SxProps;
}

export const ChecklistFilter = <T extends ParcelMixin>({
  parcels = [],
  setter = () => console.warn('no setter passing to ChecklistFilter'),
  inputSx,
}: ChecklistFilterProps<T>) => {
  const { t } = useTranslation('tasks');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<typeof parcels>([]);
  const fuse = useMemo(
    () => new Fuse(parcels, { keys: Object.keys(parcels[0] ?? {}) }),
    [parcels]
  );

  const onClear = () => setSearchVal('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  useEffect(() => {
    setFusedParcels(parcels);
    return () => setFusedParcels([]);
  }, [parcels]);

  useEffect(() => {
    // extra filter hook
    setter(fusedParcels);
  }, [fusedParcels, setter]);

  useEffect(() => {
    if (!searchVal) return setFusedParcels(parcels);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const result = fuse.search(searchVal);
      const parcels = result.map(({ item }) => item);
      setFusedParcels(parcels);
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [fuse, parcels, searchVal]);

  return (
    <>
      <TextField
        id="parcel-filter"
        label={t('label.searchParcel')}
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1, ...inputSx }}
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
    </>
  );
};

ChecklistFilter.displayName = 'ChecklistFilter';

export default ChecklistFilter;
