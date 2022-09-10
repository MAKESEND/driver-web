import type { ParcelToSort } from 'types';
import axios from 'axios';
import { useQuery } from 'react-query';
import api from 'utils/services/apiServices';

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

export const useGetParcelByOrderId = (orderId: string) => {
  return useQuery('parcelsByOrderId', () => api.getParcelsByOrderId(orderId), {
    ...config,
  });
};

export const queries = { useGetSortingList, useGetParcelByOrderId };

export default queries;
