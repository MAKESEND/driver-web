import type { AxiosRequestConfig } from 'axios';
import type {
  Routes,
  ImageUploadRequest,
  ParcelToSort,
  ParcelStatusRequest,
  MSApiResponse,
  ApiResponse,
  GooglePickupResponse,
} from 'types';
import axios from 'axios';
import getConfig from 'next/config';
import { getEndpoint } from './getEndpoint';
import { getParcelsByOrderId } from './getParcelsByOrderId';

export const api = {
  getParcelsByOrderId,
  getSortingList: () =>
    axios.get<ApiResponse<ParcelToSort[]>>(
      getEndpoint({ route: 'getSortingList' as Routes })
    ),
  getPickupTasks: () =>
    axios.post<ApiResponse<GooglePickupResponse>>(
      getEndpoint({ route: 'getPickupTasks' as Routes })
    ),
  updateParcelStatus: (payload: ParcelStatusRequest) =>
    axios.post<ApiResponse>(
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
