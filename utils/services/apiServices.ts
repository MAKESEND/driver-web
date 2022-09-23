import type { AxiosRequestConfig } from 'axios';
import type {
  Routes,
  ImageUploadRequest,
  ParcelStatusRequest,
  MSApiResponse,
} from 'types';
import axios from 'axios';
import getConfig from 'next/config';
import { getEndpoint } from './getEndpoint';
import { getParcelsByOrderId } from './getParcelsByOrderId';
import { getSortingList } from './getSortingList';
import { getPickupTasks } from './getPickupTasks';

export const api = {
  getParcelsByOrderId,
  getSortingList,
  getPickupTasks,
  updateParcelStatus: (payload: ParcelStatusRequest) =>
    axios.post(
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
