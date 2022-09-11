import type { FC } from 'react';
import type { PickupTask } from 'types';

export interface PickupTasksProps {
  pickupTasks?: PickupTask[];
}

export const PickupTasks: FC<PickupTasksProps> = ({ pickupTasks }) => {
  if (!pickupTasks) {
    return null;
  }

  return null;
};

export default PickupTasks;
