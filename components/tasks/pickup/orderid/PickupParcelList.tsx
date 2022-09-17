import { Dispatch, FC, SetStateAction, ChangeEvent, useCallback } from 'react';
import type { Parcel } from 'types';
import { useState, useEffect, memo } from 'react';
import { PickupParcelFilter } from './PickupParcelFilter';
import PickupParcelCard from './PickupParcelCard';
import { Box, Checkbox, Divider, List } from '@mui/material';

export interface PickupParcelListProps {
  parcels?: Parcel[];
  selectedParcels?: string[];
  setSelectedParcels?: Dispatch<SetStateAction<string[]>>;
}

export const PickupParcelList: FC<PickupParcelListProps> = ({
  parcels = [],
  selectedParcels = [],
  setSelectedParcels = () =>
    console.warn('no setter given to PickupParcelList'),
}) => {
  const [filteredParcels, setFilteredParcels] = useState<Parcel[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const changeSelectAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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
    if (!selectedParcels.length) {
      setSelectAll(false);
    }
  }, [selectedParcels]);

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          gap: (t) => t.spacing(2),
          backgroundColor: (t) => t.palette.white.main,
          zIndex: (t) => t.zIndex.drawer,
          paddingTop: (t) => t.spacing(3),
          paddingBottom: (t) => t.spacing(1),
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
      <Divider flexItem />
      <List disablePadding>
        {parcels.map((parcel) => (
          <PickupParcelCard
            key={parcel.shipmentID}
            parcel={parcel}
            selectedParcels={selectedParcels}
            setter={setSelectedParcels}
          />
        ))}
      </List>
    </>
  );
};

export const MemoizedPickupParcelList = memo(PickupParcelList);

export default MemoizedPickupParcelList;
