import type { PickupTask } from 'types';
import api from './apiServices';

export const getPickupTasks = async (): Promise<PickupTask[]> => {
  try {
    if (typeof globalThis?.window !== 'undefined') {
      throw new Error('getPickupTasks is server-side only');
    }

    const {
      data: {
        data: { parcelsToPick },
      },
    } = await api.getPickupTasks();

    if (!parcelsToPick) {
      throw new Error('no pickup task');
    }

    return parcelsToPick;
  } catch (error: any) {
    console.log("something went wrong in 'getPickupTasks'");
    console.log(error?.message ?? error);
  }

  return [];
};

export default getPickupTasks;
