import type {
  MSApiResponse,
  ParcelStatusRequest,
  UpdateParcelStatusAPI,
  ImageUploadRequest,
  DriverAuthRequest,
} from 'types';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export const useUpdateParcelStatus = () => {
  return useMutation(async (payload: ParcelStatusRequest) => {
    const {
      data: { status, data, message },
    } = await axios.post<MSApiResponse<UpdateParcelStatusAPI>>(
      '/api/parcel/update-status',
      payload
    );

    return {
      sorted:
        (status === 200 && !!data?.successUpdate.length) ||
        (!!data?.errorUpdate.length && /403/g.test(data?.errorUpdate[0])),
      message,
      successUpdate: data?.successUpdate ?? [],
      errorUpdate: data?.errorUpdate ?? [],
    };
  });
};

export const useUploadImage = () => {
  return useMutation((payload: ImageUploadRequest) =>
    axios.post('/api/upload-image', payload)
  );
};

export const useDriverLogin = () => {
  return useMutation((payload: DriverAuthRequest) =>
    axios.post('/api/auth/login', payload)
  );
};

export const useDriverCheckin = () => {
  return useMutation((payload: DriverAuthRequest) =>
    axios.post('/api/auth/driver/checkin', payload)
  );
};

export const mutations = { useUpdateParcelStatus, useUploadImage };

export default mutations;
