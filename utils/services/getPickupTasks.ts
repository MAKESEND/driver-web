import type { PickupTask } from 'types';
import api from './apiServices';

export const getPickupTasks = async (): Promise<PickupTask[] | void> => {
  try {
    if (window || typeof window !== 'undefined') {
      throw new Error('getPickupTasks is server-side only');
    }

    const {
      data: {
        data: { parcelsToPick },
      },
    } = await api.getPickupTasks();

    return parcelsToPick;
  } catch (error: any) {
    console.log("something went wrong in 'getPickupTasks'");
    console.log(error?.message ?? error);
  }
};

export default getPickupTasks;
