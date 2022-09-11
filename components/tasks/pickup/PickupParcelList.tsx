import type { Dispatch, FC, SetStateAction } from 'react';
import type { Parcel, ParcelMixin } from 'types';
import { useState, memo } from 'react';
import { TaskFilter } from '../TaskFilter';

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

  return (
    <>
      <TaskFilter tasks={parcels} setter={setFilteredParcels} />
    </>
  );
};

export const MemoizedPickupParcelList = memo(PickupParcelList);

export default MemoizedPickupParcelList;
