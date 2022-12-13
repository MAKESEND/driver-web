import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  Driver,
  DriverAuthRequest,
  Parcel,
  ImageUploadRequest,
  ParcelToSort,
  ParcelStatusRequest,
  ParcelStatusResponse,
  DriverCheckinResponse,
  MSApiResponse,
  ApiResponse,
  GooglePickupResponse,
  DropoffTask,
  ParcelByTrackingId,
} from 'types';
import axios from 'axios';
import getConfig from 'next/config';
import get from 'lodash/get';
import { getEndpoint } from './getEndpoint';

export const api = {
  getParcelByTrackingId: (trackingID: string[]) =>
    axios.post<
      { trackingID: string[] },
      AxiosResponse<{
        resCode: number;
        orderList: ParcelByTrackingId[];
        message: string;
      }>
    >(getEndpoint({ route: 'getParcelsByTrackingIds' }), {
      trackingID,
    }),
  getParcelsByOrderId: (orderId: string) =>
    axios.post<{ orderId: string }, AxiosResponse<ApiResponse<Parcel[]>>>(
      getEndpoint({ route: 'getParcelsByOrderId' }),
      { orderId }
    ),
  getSortingList: () =>
    axios.get<ApiResponse<ParcelToSort[]>>(
      getEndpoint({ route: 'getSortingList' })
    ),
  getPickupTasks: () =>
    axios.post<ApiResponse<GooglePickupResponse>>(
      getEndpoint({ route: 'getPickupTasks' })
    ),
  getDropoffTasks: (driverId = '') =>
    axios.get<ApiResponse<DropoffTask[]>>(
      `${getEndpoint({ route: 'getDropoffTasks' })}/${driverId}`
    ),
  getParcelsByDate: (serviceDate?: string) =>
    axios.post<ApiResponse<ParcelByTrackingId[]>>(
      `${getEndpoint({ route: 'getParcelsByDate' })}`,
      { serviceDate }
    ),
  updateParcelStatus: (payload: ParcelStatusRequest) =>
    axios.post<ApiResponse<ParcelStatusResponse>>(
      getEndpoint({ route: 'updateParcelStatus' }),
      payload,
      getConfigKey('sorting')
    ),
  uploadImg: (payload: ImageUploadRequest) =>
    axios.post<MSApiResponse>(
      getEndpoint({ route: 'uploadImg' }),
      payload,
      getConfigKey('updateParcelSize')
    ),
  getDriverData: (driverId: string) =>
    axios.get<MSApiResponse<Driver>>(
      `${getEndpoint({ route: 'driversRoot' })}/${driverId}`,
      getConfigKey('driverMgnt')
    ),
  authDriver: (payload: DriverAuthRequest) =>
    axios.post<Omit<MSApiResponse, 'data'> & { id: string }>(
      getEndpoint({ route: 'driverAuth' }),
      payload,
      getConfigKey('driverMgnt')
    ),
  checkinDriver: (payload: DriverAuthRequest) =>
    axios.post<MSApiResponse<DriverCheckinResponse>>(
      getEndpoint({ route: 'driverCheckin' }),
      payload,
      getConfigKey('driverMgnt')
    ),
  refreshToken: (config?: AxiosRequestConfig) =>
    axios.get<{ accessToken: string }>('/api/auth/refresh-token', {
      withCredentials: true, // used when authentication service is on different app
      ...config,
    }),
};

export default api;

const keyHeader = {
  sorting: 'ms-key',
  updateParcelStatus: 'ms-key',
  updateParcelSize: 'ms-key',
  driverMgnt: 'apiKey',
};

const getConfigKey = (key: string): AxiosRequestConfig => {
  const {
    publicRuntimeConfig: {
      ENV: { APP_ENV },
    },
    serverRuntimeConfig: { msKey },
  } = getConfig();

  return {
    headers: {
      'Content-Type': 'application/json',
      [get(keyHeader, key, 'ms-key')]: msKey[APP_ENV][key],
    },
  };
};
