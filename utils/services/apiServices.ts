import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  Routes,
  Parcel,
  ImageUploadRequest,
  ParcelToSort,
  ParcelStatusRequest,
  ParcelStatusResponse,
  MSApiResponse,
  ApiResponse,
  GooglePickupResponse,
  DropoffTask,
} from 'types';
import axios from 'axios';
import getConfig from 'next/config';
import { getEndpoint } from './getEndpoint';

export const api = {
  getParcelsByOrderId: (orderId: string) =>
    axios.post<{ orderId: string }, AxiosResponse<ApiResponse<Parcel[]>>>(
      getEndpoint({ route: 'getParcelsByOrderId' as Routes }),
      { orderId }
    ),
  getSortingList: () =>
    axios.get<ApiResponse<ParcelToSort[]>>(
      getEndpoint({ route: 'getSortingList' as Routes })
    ),
  getPickupTasks: () =>
    axios.post<ApiResponse<GooglePickupResponse>>(
      getEndpoint({ route: 'getPickupTasks' as Routes })
    ),
  getDropoffTasks: (driverId = '') =>
    axios.get<ApiResponse<DropoffTask[]>>(
      `${getEndpoint({ route: 'getDropoffTasks' as Routes })}/${driverId}`
    ),
  updateParcelStatus: (payload: ParcelStatusRequest) =>
    axios.post<ApiResponse<ParcelStatusResponse>>(
      getEndpoint({ route: 'updateParcelStatus' as Routes }),
      payload,
      getConfigKey('sorting')
    ),
  uploadImg: (payload: ImageUploadRequest) =>
    axios.post<MSApiResponse>(
      getEndpoint({ route: 'uploadImg' as Routes }),
      payload,
      getConfigKey('updateParcelSize')
    ),
};

export default api;

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
      'ms-key': msKey[APP_ENV][key],
    },
  };
};
