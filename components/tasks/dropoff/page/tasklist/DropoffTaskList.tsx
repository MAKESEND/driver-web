import type { DropoffTask } from 'types';
import DropoffTaskCard from './DropoffTaskCard';
import { Stack } from '@mui/material';

export interface DropoffTaskListProps {
  dropoffTasks: DropoffTask[];
}

export const DropoffTaskList: React.FC<DropoffTaskListProps> = ({
  dropoffTasks,
}) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {dropoffTasks.map((task) => (
        <DropoffTaskCard key={task.trackingID} dropoffTask={task} />
      ))}
    </Stack>
  );
};

export default DropoffTaskList;
