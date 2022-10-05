import type { ParcelByTrackingId } from 'types';
import api from './apiServices';

export const getParcelsByDate = async (
  date?: string
): Promise<ParcelByTrackingId[] | void> => {
  try {
    if (window || typeof window !== 'undefined') {
      throw new Error('getParcelsByDate is server-side only');
    }

    const {
      data: { data: parcels },
    } = await api.getParcelsByDate(date);

    return parcels;
  } catch (error: any) {
    console.log('something went wrong in getParcelsByDate');
    console.log(error?.message ?? error);
  }
};

export default getParcelsByDate;
