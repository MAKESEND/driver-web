import type { Parcel } from 'types';
import api from './apiServices';

export const getParcelsByOrderId = async (
  orderId: string
): Promise<Parcel[]> => {
  try {
    if (typeof globalThis?.window !== 'undefined') {
      throw new Error('getParcelsByOrderId is server-side only');
    }

    if (!orderId) {
      throw new Error('no orderId passing to getParcelsByOrderId');
    }

    const {
      data: { data: parcels },
    } = await api.getParcelsByOrderId(orderId);

    if (!parcels) {
      throw new Error(`no parcels under orderID ${orderId}`);
    }

    return parcels;
  } catch (error: any) {
    console.log("something went wrong in 'getParcelsByOrderId'");
    console.log(error?.message ?? error);
  }

  return [];
};

export default getParcelsByOrderId;
