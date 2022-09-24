import type { DropoffTask } from 'types';
import { useState, useEffect, useRef, memo } from 'react';
import { useRecoilState } from 'recoil';
import { dropoffParcelState } from 'states';
import { Box, Divider } from '@mui/material';
import { CollectlistSummary } from './collectlist/CollectlistSummary';
import { CollectlistFilter } from './collectlist/CollectlistFilter';
import { Collectlist } from './collectlist/Collectlist';
import { CollectlistBottomNav } from './collectlist/CollectlistBottomNav';

export interface DropoffCollectlistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffCollectlist: React.FC<DropoffCollectlistProps> = ({
  dropoffTasks = [],
}) => {
  const syncedRef = useRef(false);

  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [filteredParcels, setFilteredParcels] = useState<DropoffTask[]>([]);
  const [dropoffParcels, setDropoffParcels] =
    useRecoilState(dropoffParcelState);

  useEffect(() => {
    // reset local states
    return () => {
      syncedRef.current = false;
      setSelectedParcels([]);
    };
  }, []);

  useEffect(() => {
    setFilteredParcels(dropoffTasks);
    return () => setFilteredParcels([]);
  }, [dropoffTasks]);

  useEffect(() => {
    if (!syncedRef.current) {
      // sync recoil to local state
      setSelectedParcels(dropoffParcels);
      syncedRef.current = true;
    } else {
      // sync local state to recoil
      setDropoffParcels(selectedParcels);
    }
  }, [dropoffParcels, selectedParcels, setDropoffParcels]);

  const onConfirm = () => {
    console.log('confirm');
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
        <CollectlistFilter
          dropoffTasks={dropoffTasks}
          selectedParcels={selectedParcels}
          setSelectedParcels={setSelectedParcels}
          filteredParcels={filteredParcels}
          setFilteredParcels={setFilteredParcels}
        />
        <Divider />
        <Collectlist dropoffTasks={filteredParcels} />
      </Box>
      <CollectlistBottomNav
        onConfirm={onConfirm}
        countSelected={selectedParcels.length}
        countTotal={dropoffTasks.length}
      />
    </>
  );
};

const MemoizedDropoffCollectlist = memo(DropoffCollectlist);

export default MemoizedDropoffCollectlist;
