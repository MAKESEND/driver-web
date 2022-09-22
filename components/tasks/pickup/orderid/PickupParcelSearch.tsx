import type { Parcel } from 'types';
import type { PickupParcelListProps } from './PickupParcelList';
import { useState, useEffect, useCallback } from 'react';
import { Box, Checkbox } from '@mui/material';
import { PickupParcelFilter } from './parcel-search/PickupParcelFilter';

export interface PickupParcelSearchProps extends PickupParcelListProps {
  sticky?: boolean;
}

export const PickupParcelSearch: React.FC<PickupParcelSearchProps> = ({
  sticky = false,
  parcels = [],
  selectedParcels = [],
  setSelectedParcels = () =>
    console.warn('no setter given to PickupParcelSearch'),
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [filteredParcels, setFilteredParcels] = useState<Parcel[]>([]);

  const changeSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      const parcelIds = filteredParcels.map((parcel) => parcel.shipmentID);

      if (checked) {
        setSelectedParcels((val) => [
          ...Array.from(new Set([...val, ...parcelIds])),
        ]);
      } else {
        setSelectedParcels(() =>
          selectedParcels.filter((parcel) => !parcelIds.includes(parcel))
        );
      }

      setSelectAll(checked);
    },
    [filteredParcels, selectedParcels, setSelectedParcels]
  );

  useEffect(() => {
    setSelectAll(selectedParcels.length === parcels.length);
  }, [parcels, selectedParcels]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: (t) => t.spacing(2),
        backgroundColor: (t) => t.palette.white.main,
        ...(sticky && {
          position: 'sticky',
          top: 0,
          zIndex: (t) => t.zIndex.drawer,
          paddingTop: (t) => t.spacing(3),
          paddingBottom: (t) => t.spacing(1),
        }),
      }}
    >
      <Checkbox
        checked={selectAll}
        onChange={changeSelectAll}
        sx={{ height: (t) => t.spacing(5) }}
      />
      <PickupParcelFilter
        parcels={parcels}
        setter={setFilteredParcels}
        wrapperSx={{ flexGrow: 1 }}
      />
    </Box>
  );
};

export default PickupParcelSearch;
