import type { DropoffTask } from 'types';
import { useState, useEffect } from 'react';
import NoTask from 'components/tasks/NoTask';
import DropoffSummary from './tasklist/DropoffSummary';
import DropoffTaskFilter from './tasklist/DropoffTaskFilter';
import DropoffTaskList from './tasklist/DropoffTaskList';
import { Box } from '@mui/material';

export interface DropoffTasklistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffTasklist: React.FC<DropoffTasklistProps> = ({
  dropoffTasks = [],
}) => {
  const [filteredTasks, setFilteredTasks] = useState<DropoffTask[]>([]);

  useEffect(() => {
    setFilteredTasks(dropoffTasks);
    return () => setFilteredTasks([]);
  }, [dropoffTasks]);

  if (!dropoffTasks.length) {
    return <NoTask />;
  }

  return (
    <Box
      sx={{
        padding: (t) => t.spacing(3),
        paddingTop: 0,
        display: 'flex',
        gap: (t) => t.spacing(1),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DropoffSummary
        dropoffTasks={dropoffTasks}
        filteredTasks={filteredTasks}
      />
      <DropoffTaskFilter
        scan
        dropoffTasks={dropoffTasks}
        setFilteredTasks={setFilteredTasks}
      />
      <DropoffTaskList dropoffTasks={filteredTasks} />
    </Box>
  );
};

export default DropoffTasklist;
