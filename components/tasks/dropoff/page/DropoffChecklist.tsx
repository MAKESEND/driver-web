import type { DropoffTask } from 'types';
import { useState, useEffect, useRef, memo } from 'react';
import { useRecoilState } from 'recoil';
import { dropoffParcelState } from 'states';
import { Box, Divider } from '@mui/material';
import { ChecklistSummary } from './checklist/ChecklistSummary';
import { ChecklistFilter } from './checklist/ChecklistFilter';
import { CheckTaskList } from './checklist/CheckTaskList';
import { ChecklistBottomNav } from './checklist/ChecklistBottomNav';

export interface DropoffChecklistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffChecklist: React.FC<DropoffChecklistProps> = ({
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
        <ChecklistSummary />
        <ChecklistFilter
          dropoffTasks={dropoffTasks}
          selectedParcels={selectedParcels}
          setSelectedParcels={setSelectedParcels}
          filteredParcels={filteredParcels}
          setFilteredParcels={setFilteredParcels}
        />
        <Divider />
        <CheckTaskList dropoffTasks={filteredParcels} />
      </Box>
      <ChecklistBottomNav
        onConfirm={onConfirm}
        countSelected={selectedParcels.length}
        countTotal={dropoffTasks.length}
      />
    </>
  );
};

const MemoizedDropoffChecklist = memo(DropoffChecklist);

export default MemoizedDropoffChecklist;
