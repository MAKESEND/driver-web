import type { FC } from 'react';
import type { PickupTasksProps } from './PickupTasks';
import { PickupTaskCard } from './PickupTaskCard';

export const PickupTaskList: FC<PickupTasksProps> = ({ pickupTasks }) => {
  if (!pickupTasks || !pickupTasks.length) return null;

  return (
    <>
      {pickupTasks.map((pickupTask) => (
        <PickupTaskCard key={pickupTask.order_id} pickupTask={pickupTask} />
      ))}
    </>
  );
};

export default PickupTaskList;
