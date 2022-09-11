import type { Parcel, ParcelToSort, PickupTask } from 'types';
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

export const useGetPickupTasks = (driverId?: string) => {
  return useQuery(
    'pickupTasks',
    async () => {
      const {
        data: { data: pickupTasks },
      } = await axios.post<{ data: PickupTask[] }>('/api/tasks/pickup', {
        driverId,
      });

      if (driverId) {
        return pickupTasks.filter((task) => task.driver_id === driverId);
      }

      console.warn("no driverId is given to 'useGetPickupTasks'");
      return pickupTasks;
    },
    { ...config }
  );
};

export const queries = {
  useGetSortingList,
  useGetParcelsByOrderId,
  useGetPickupTasks,
};

export default queries;
