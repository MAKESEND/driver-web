import { Dispatch, FC, SetStateAction, ChangeEvent, useCallback } from 'react';
import type { Parcel } from 'types';
import { useState, useEffect, memo } from 'react';
import { PickupParcelFilter } from './PickupParcelFilter';
import { Box, Checkbox, Card, Stack, Divider } from '@mui/material';

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

  const changeCheckbox = useCallback(
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

  return (
    <>
      <Box sx={{ display: 'flex', gap: (t) => t.spacing(2) }}>
        <Checkbox checked={selectAll} onChange={changeCheckbox} />
        <PickupParcelFilter
          parcels={parcels}
          setter={setFilteredParcels}
          wrapperSx={{ flexGrow: 1 }}
        />
      </Box>
      <Divider flexItem />
      <Stack spacing={2}>
        <Card sx={{ display: 'flex', gap: (t) => t.spacing(2) }}>
          <Checkbox />
          <Box sx={{ padding: (t) => t.spacing(1) }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            provident saepe delectus pariatur hic aspernatur modi culpa libero
            minus, earum quia quaerat, quod temporibus explicabo obcaecati illum
            quas repellendus eaque?
          </Box>
        </Card>
      </Stack>
    </>
  );
};

export const MemoizedPickupParcelList = memo(PickupParcelList);

export default MemoizedPickupParcelList;
