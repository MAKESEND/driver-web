import { getParcelsByOrderId } from './getParcelsByOrderId';
import { getSortingList } from './getSortingList';
import { updateParcelStatus } from './updateParcelStatus';
import { getPickupTasks } from './getPickupTasks';

export const api = {
  getParcelsByOrderId,
  getSortingList,
  updateParcelStatus,
  getPickupTasks,
};

export default api;
