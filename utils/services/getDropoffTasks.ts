import type { DropoffTask } from 'types';
import api from './apiServices';

export const getDropoffTasks = async (
  driverId: string
): Promise<DropoffTask[] | void> => {
  try {
    if (window || typeof window !== 'undefined') {
      throw new Error('getDropoffTasks is server-side only');
    }

    if (!driverId) {
      throw new Error('no driverId passing to getDropoffTasks');
    }

    const {
      data: { data: dropoffTasks },
    } = await api.getDropoffTasks(driverId);

    return dropoffTasks;
  } catch (error: any) {
    console.log('something went wrong in getDropoffTasks');
    console.log(error?.message ?? error);
  }
};

export default getDropoffTasks;
