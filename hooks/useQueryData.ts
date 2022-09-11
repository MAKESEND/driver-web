import type { Parcel, ParcelToSort } from 'types';
import axios from 'axios';
import { useQuery } from 'react-query';

const retry = 3;
const staleTime = 5 * 60 * 1000; // 5 mins
const config = {
  retry,
  staleTime,
  // refetchInterval: staleTime,
  cacheTime: staleTime,
  refetchOnWindowFocus: true,
};

export const useGetSortingList = () => {
  return useQuery(
    'sorting',
    async () => {
      const {
        data: { data: parcels },
      } = await axios.get<{ data: ParcelToSort[] }>('/api/sortinglist');

      return parcels;
    },
    { ...config }
  );
};

export const useGetParcelsByOrderId = (orderId: string) => {
  return useQuery(
    'parcelsByOrderId',
    async () => {
      const {
        data: { data: parcels },
      } = await axios.get<{ data: Parcel[] }>(`/api/parcel/orderid/${orderId}`);

      return parcels;
    },
    {
      ...config,
    }
  );
};

export const queries = { useGetSortingList, useGetParcelsByOrderId };

export default queries;
