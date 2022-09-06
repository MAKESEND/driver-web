import type { Parcel, Routes, ApiResponse } from 'types';
import axios from 'axios';
import getEndpoint from 'utils/services/getEndpoint';

export const getParcelsByOrderId = async (orderId: string) => {
  let parcels: Parcel[] = [];

  try {
    if (orderId) {
      const endpoint = getEndpoint({ route: 'getParcelsByOrderId' as Routes });

      const {
        data: { data, status, message },
      } = await axios.post<
        { orderId: string },
        { data: ApiResponse<Parcel[]> }
      >(endpoint, { orderId });

      if (status === 200) {
        parcels = data;
      } else {
        throw new Error(message);
      }
    }
  } catch (error: any) {
    console.log("something went wrong in 'getParcelsByOrderId'");
    console.log(error?.message ?? error);
  }

  return parcels;
};

export default getParcelsByOrderId;
