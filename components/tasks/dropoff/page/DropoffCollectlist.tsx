import type { DropoffTask, ParcelStatus } from 'types';
import { useState, useEffect, useRef, memo } from 'react';
import { useRecoilState } from 'recoil';
import { dropoffParcelState } from 'states';
import { Divider } from '@mui/material';
import { useUpdateParcelStatus } from 'hooks/useMutateData';
import CollectlistSummary from './collectlist/CollectlistSummary';
import Collectlist from './collectlist/Collectlist';
import CollectlistBottomNav from './collectlist/CollectlistBottomNav';
import TaskSelector from 'components/tasks/TaskSelector';

export interface DropoffCollectlistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffCollectlist: React.FC<DropoffCollectlistProps> = ({
  dropoffTasks = [],
}) => {
  const { isLoading, mutate } = useUpdateParcelStatus();
  const syncedRef = useRef(false);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [filteredParcels, setFilteredParcels] =
    useState<DropoffTask[]>(dropoffTasks);
  const [dropoffParcels, setDropoffParcels] =
    useRecoilState(dropoffParcelState);

  useEffect(() => {
    if (syncedRef.current) {
      // sync local state to recoil
      setDropoffParcels(selectedParcels);
    }
  }, [selectedParcels, setDropoffParcels]);

  useEffect(() => {
    if (!syncedRef.current) {
      // sync recoil to local state
      setSelectedParcels(dropoffParcels);
      syncedRef.current = true;
    }
  }, [dropoffParcels, setDropoffParcels]);

  const onConfirm = () => {
    mutate({
      shipment: selectedParcels.map((trackingID) => ({
        trackingID,
        status: 'Delivering' as ParcelStatus,
      })),
    });
  };

  if (!dropoffTasks.length) {
    return null;
  }

  return (
    <>
      <CollectlistSummary />
      <TaskSelector
        sticky
        disabled={isLoading}
        parcels={dropoffTasks}
        selectedParcels={selectedParcels}
        setSelectedParcels={setSelectedParcels}
        filteredParcels={filteredParcels}
        setFilteredParcels={setFilteredParcels}
        href="/scanner?type=dropoff"
      />
      <Divider />
      <Collectlist
        disabled={isLoading}
        dropoffTasks={filteredParcels}
        selectedParcels={selectedParcels}
        setSelectedParcels={setSelectedParcels}
      />
      <CollectlistBottomNav
        disabled={!selectedParcels.length || isLoading}
        isLoading={isLoading}
        onConfirm={onConfirm}
        countSelected={selectedParcels.length}
        countTotal={dropoffTasks.length}
      />
    </>
  );
};

export const MemoizedDropoffCollectlist = memo(DropoffCollectlist);

export default MemoizedDropoffCollectlist;
