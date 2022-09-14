import type { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { SxProps } from '@mui/material';
import type { Parcel } from 'types';
import Fuse from 'fuse.js';
import { useState, useEffect, useMemo, useRef } from 'react';
import { pickupParcelProps } from 'utils/constants/delivery';
import { Box, IconButton } from '@mui/material';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const TextField = dynamic(() => import('@mui/material/TextField'));
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));

export interface PickupParcelFilterProps {
  parcels: Parcel[];
  setter?: Dispatch<SetStateAction<Parcel[]>>;
  wrapperSx?: SxProps;
  inputSx?: SxProps;
}

export const PickupParcelFilter: FC<PickupParcelFilterProps> = ({
  parcels = [],
  setter = () => console.warn('no setter passing to PickupParcelFilter'),
  wrapperSx,
  inputSx,
}) => {
  const { t } = useTranslation('tasks');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<Parcel[]>([]);
  const fuse = useMemo(
    () => new Fuse(parcels, { keys: pickupParcelProps }),
    [parcels]
  );

  const onClear = () => setSearchVal('');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <Box sx={{ width: '100%', display: 'flex', ...wrapperSx }}>
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
    </Box>
  );
};

export default PickupParcelFilter;
