import type { Routes, ImageUploadRequest, MSApiResponse } from 'types';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import getConfig from 'next/config';
import { getEndpoint } from './getEndpoint';
import { getParcelsByOrderId } from './getParcelsByOrderId';
import { getSortingList } from './getSortingList';
import { getPickupTasks } from './getPickupTasks';
import { updateParcelStatus } from './updateParcelStatus';

const {
  publicRuntimeConfig: {
    ENV: { APP_ENV },
  },
  serverRuntimeConfig: { msKey },
} = getConfig();

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'ms-key': msKey[APP_ENV].updateParcelSize,
  },
};

export const api = {
  getParcelsByOrderId,
  getSortingList,
  getPickupTasks,
  updateParcelStatus,
  uploadImg: (payload: ImageUploadRequest) =>
    axios.post<MSApiResponse>(
      getEndpoint({ route: 'uploadImg' as Routes }),
      payload,
      config
    ),
};

export default api;
