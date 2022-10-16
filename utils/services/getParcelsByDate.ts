import type { ParcelByTrackingId } from 'types';
import api from './apiServices';

export const getParcelsByDate = async (
  date?: string
): Promise<ParcelByTrackingId[]> => {
  try {
    if (typeof globalThis?.window !== 'undefined') {
      throw new Error('getParcelsByDate is server-side only');
    }

    const {
      data: { data: parcels },
    } = await api.getParcelsByDate(date);

    if (!parcels) {
      throw new Error('no parcels');
    }

    return parcels;
  } catch (error: any) {
    console.log('something went wrong in getParcelsByDate');
    console.log(error?.message ?? error);
  }

  return [];
};

export default getParcelsByDate;
