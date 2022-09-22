import type { Dispatch, FC, SetStateAction } from 'react';
import type { Parcel } from 'types';
import { memo } from 'react';
import PickupParcelCard from './PickupParcelCard';
import { List } from '@mui/material';

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
  return (
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
  );
};

export const MemoizedPickupParcelList = memo(PickupParcelList);

export default MemoizedPickupParcelList;
