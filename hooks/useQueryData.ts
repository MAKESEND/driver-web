import type { UseQueryOptions } from '@tanstack/react-query';
import type {
  MSApiResponse,
  Parcel,
  ParcelToSort,
  PickupTask,
  DropoffTask,
  ParcelByTrackingId,
  Driver,
  UserData,
} from 'types';
import type { countries } from 'utils/constants/locales';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { rounds } from 'utils/constants/delivery';
import { locale } from 'utils/common/locale';

const retry = 2;
const staleTime = 5 * 60 * 1000; // 5 mins
const config = {
  retry,
  staleTime,
  cacheTime: staleTime * 12 * 10,
  refetchInterval: staleTime,
  refetchOnWindowFocus: false,
};

export const useGetSortingList = (
  customConfig?: Omit<
    UseQueryOptions<
      ParcelToSort[] | undefined,
      unknown,
      ParcelToSort[] | undefined,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['sortinglist'],
    async () => {
      const {
        data: { data: parcels },
      } = await axios.get<MSApiResponse<ParcelToSort[]>>('/api/sortinglist');

      return parcels;
    },
    { ...config, ...customConfig }
  );
};

export const useGetParcelsByOrderId = (
  orderId: string,
  customConfig?: Omit<
    UseQueryOptions<
      Parcel[] | undefined,
      unknown,
      Parcel[] | undefined,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) => {
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
      ...customConfig,
    }
  );
};

export const useGetPickupTasks = (
  driverId?: string,
  customConfig?: Omit<
    UseQueryOptions<
      PickupTask[] | undefined,
      unknown,
      PickupTask[] | undefined,
      (string | undefined)[]
    >,
    'queryKey' | 'queryFn'
  >
) => {
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
    { ...config, ...customConfig }
  );
};

export const useGetDropoffTasks = (
  driverId: string,
  customConfig?: Omit<
    UseQueryOptions<
      DropoffTask[] | undefined,
      unknown,
      DropoffTask[] | undefined,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) => {
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
    { ...config, ...customConfig }
  );
};

export const useGetParcelsByTrackingId = (
  trackingId: string,
  customConfig?: Omit<
    UseQueryOptions<
      ParcelByTrackingId | undefined,
      unknown,
      ParcelByTrackingId | undefined,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['parcel', trackingId],
    async () => {
      const {
        data: { data: parcels },
      } = await axios.get<MSApiResponse<ParcelByTrackingId[]>>(
        `/api/parcel/trackingid/${trackingId}`
      );

      if (Array.isArray(parcels)) {
        return parcels[0];
      }

      return;
    },
    { ...config, ...customConfig }
  );
};

export const useGetParcelsByDate = (
  date?: string,
  country = 'th',
  customConfig?: Omit<
    UseQueryOptions<
      ParcelByTrackingId[] | undefined,
      unknown,
      ParcelByTrackingId[] | undefined,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const localDate =
    date ?? locale.getLocalDate(country as keyof typeof countries);

  return useQuery(
    ['parcels', localDate],
    async () => {
      const {
        data: { data: parcels },
      } = await axios.get<MSApiResponse<ParcelByTrackingId[]>>(
        `/api/parcel/date/${date}`
      );

      return parcels;
    },
    { ...config, ...customConfig }
  );
};

export const useGetDriverData = (
  driverId: string,
  customConfig?: Omit<
    UseQueryOptions<Driver | undefined, unknown, Driver | undefined, string[]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['driver', driverId],
    async () => {
      const {
        data: { data: driverData },
      } = await axios.get<MSApiResponse<Driver>>(`/api/driver/${driverId}`);

      return driverData;
    },
    { ...config, ...customConfig }
  );
};

export const useUser = (
  customConfig?: Omit<
    UseQueryOptions<UserData | null, unknown, UserData | null, string[]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['user'],
    async () => {
      try {
        const {
          data: { data: userData },
        } = await axios.get<MSApiResponse<UserData>>('/api/auth/user');

        return userData ?? null;
      } catch (error: any) {
        // prevent printing when unauthenticated
        if (error?.response.status !== 401) {
          console.log(
            error?.response?.data?.message ?? error?.message ?? error
          );
        }

        return null;
      }
    },
    { ...config, ...customConfig }
  );
};

export const queries = {
  useGetSortingList,
  useGetParcelsByOrderId,
  useGetPickupTasks,
  useGetDropoffTasks,
  useGetDriverData,
  useUser,
};

export default queries;
