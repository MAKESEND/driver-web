import type { Routes } from 'types/routes';
import type { Parcel } from 'types/delivery/parcel';
import axios from 'axios';
import getEndpoint from 'utils/services/getEndpoint';

export const getParcelsByOrderId = async (orderId: string) => {
  let parcels: Parcel[] = [];

  try {
    if (orderId) {
      const endpoint = getEndpoint({ route: 'getParcelsByOrderId' as Routes });

      const {
        data: { data },
      } = await axios.post<{ orderId: string }, { data: { data: Parcel[] } }>(
        endpoint,
        { orderId }
      );

      parcels = data;
    }
  } catch (error: any) {
    console.log("something went wrong in 'getParcelsByOrderId'");
    console.log(error?.message ?? error);
  }

  return parcels;
};

export default getParcelsByOrderId;
