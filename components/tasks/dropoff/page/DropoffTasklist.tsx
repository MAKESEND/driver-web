import type { DropoffTask } from 'types';
import { useState, useEffect } from 'react';
import TaskFilter from 'components/tasks/TaskFilter';
import { dropoffTaskProps } from 'utils/constants/delivery';
import { dropoffTaskStatusFilters } from 'utils/constants/delivery';
import DropoffSummary from './tasklist/DropoffSummary';
import DropoffTaskList from './tasklist/DropoffTaskList';
import { Box } from '@mui/material';

export interface DropoffTasklistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffTasklist: React.FC<DropoffTasklistProps> = ({
  dropoffTasks = [],
}) => {
  const [filteredTasks, setFilteredTasks] =
    useState<DropoffTask[]>(dropoffTasks);

  if (!dropoffTasks.length) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: (t) => t.spacing(2),
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
      <TaskFilter
        scan
        sticky
        tasks={dropoffTasks}
        setFilteredTasks={setFilteredTasks}
        href="/scanner?type=dropoff"
        fuseKeys={dropoffTaskProps}
        filterKey="status"
        filterOptions={dropoffTaskStatusFilters}
      />
      <DropoffTaskList dropoffTasks={filteredTasks} />
    </Box>
  );
};

export default DropoffTasklist;
