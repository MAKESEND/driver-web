import type { ParcelByTrackingId } from 'types';
import api from './apiServices';

export const getParcelsByTrackingId = async (
  trackingId: string
): Promise<ParcelByTrackingId | void> => {
  try {
    if (window || typeof window !== 'undefined') {
      throw new Error('getParcelsByTrackingId is server-side only');
    }

    if (!trackingId) {
      throw new Error('no trackingId passing to getParcelsByTrackingId');
    }

    const {
      data: { orderList },
    } = await api.getParcelByTrackingId([trackingId]);

    if (Array.isArray(orderList) && orderList.length) {
      return orderList[0];
    }
  } catch (error: any) {
    console.log('something went wrong in getParcelsByTrackingId');
    console.log(error?.message ?? error);
  }
};

export default getParcelsByTrackingId;
