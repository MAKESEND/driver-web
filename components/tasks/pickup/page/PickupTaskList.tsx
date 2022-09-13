import type { FC } from 'react';
import type { PickupTasksProps } from './PickupTasks';
import { Box } from '@mui/material';
import { PickupTaskCard } from './PickupTaskCard';

export const PickupTaskList: FC<PickupTasksProps> = ({ pickupTasks }) => {
  if (!pickupTasks || !pickupTasks.length) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1.125rem',
        marginY: '1rem',
      }}
    >
      {pickupTasks.map((pickupTask) => (
        <PickupTaskCard key={pickupTask.order_id} pickupTask={pickupTask} />
      ))}
    </Box>
  );
};

export default PickupTaskList;