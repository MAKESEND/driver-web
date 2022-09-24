import type {
  MSApiResponse,
  Parcel,
  ParcelToSort,
  PickupTask,
  DropoffTask,
} from 'types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { rounds } from 'utils/constants/delivery';

const retry = 3;
const staleTime = 5 * 60 * 1000; // 5 mins
const config = {
  retry,
  staleTime,
  refetchInterval: staleTime,
  cacheTime: staleTime,
  refetchOnWindowFocus: true,
};

export const useGetSortingList = () => {
  return useQuery(
    ['sortinglist'],
    async () => {
      const {
        data: { data: parcels },
      } = await axios.get<MSApiResponse<ParcelToSort[]>>('/api/sortinglist');

      return parcels;
    },
    { ...config }
  );
};

export const useGetParcelsByOrderId = (orderId: string) => {
  return useQuery(
    ['parcelsByOrderId', orderId],
    async () => {
      const {
        data: { data: parcels },
      } = await axios.get<MSApiResponse<Parcel[]>>(
        `/api/parcel/orderid/${orderId}`
      );

      return parcels;
    },
    {
      ...config,
    }
  );
};

export const useGetPickupTasks = (driverId?: string) => {
  return useQuery(
    ['pickupTasks', driverId],
    async () => {
      const {
        data: { data: rawPickupTasks },
      } = await axios.post<MSApiResponse<PickupTask[]>>('/api/tasks/pickup', {
        driverId,
      });

      if (!rawPickupTasks) {
        return [];
      }

      const pickupTasks =
        rawPickupTasks.filter((task) =>
          rounds.some((round) => round === +task.round)
        ) ?? [];

      if (driverId) {
        return pickupTasks.filter((task) => task.driver_id === driverId);
      }

      console.warn("no driverId is given to 'useGetPickupTasks'");
      return pickupTasks;
    },
    { ...config }
  );
};

export const useGetDropoffTasks = (driverId: string) => {
  return useQuery(
    ['dropoffTasks', driverId],
    async () => {
      const {
        data: { data: dropoffTasks },
      } = await axios.get<MSApiResponse<DropoffTask[]>>(
        `/api/tasks/dropoff/${driverId}`
      );

      return dropoffTasks;
    },
    { ...config }
  );
};

export const queries = {
  useGetSortingList,
  useGetParcelsByOrderId,
  useGetPickupTasks,
  useGetDropoffTasks,
};

export default queries;
