import type { DropoffTask, ParcelStatus } from 'types';
import { useState, useEffect, useRef, memo } from 'react';
import { useRecoilState } from 'recoil';
import { dropoffParcelState } from 'states';
import { Box, Divider } from '@mui/material';
import TaskSelector from '../../TaskSelector';
import CollectlistSummary from './collectlist/CollectlistSummary';
import Collectlist from './collectlist/Collectlist';
import CollectlistBottomNav from './collectlist/CollectlistBottomNav';
import { useUpdateParcelStatus } from 'hooks/useMutateData';

export interface DropoffCollectlistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffCollectlist: React.FC<DropoffCollectlistProps> = ({
  dropoffTasks = [],
}) => {
  const { isLoading, data, mutate } = useUpdateParcelStatus();
  const syncedRef = useRef(false);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [filteredParcels, setFilteredParcels] =
    useState<DropoffTask[]>(dropoffTasks);
  const [dropoffParcels, setDropoffParcels] =
    useRecoilState(dropoffParcelState);

  useEffect(() => {
    // reset local states
    return () => {
      syncedRef.current = false;
      setSelectedParcels([]);
      setFilteredParcels([]);
    };
  }, []);

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

  return (
    <>
      <Box
        sx={{
          padding: (t) => t.spacing(2),
          paddingBottom: 'calc(36.5px + 24px)',
        }}
      >
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
      </Box>
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

const MemoizedDropoffCollectlist = memo(DropoffCollectlist);

export default MemoizedDropoffCollectlist;
