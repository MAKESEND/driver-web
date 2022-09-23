import type {
  MSApiResponse,
  ParcelStatusRequest,
  UpdateParcelStatusAPI,
  ImageUploadRequest,
} from 'types';
import axios from 'axios';
import { useMutation } from 'react-query';

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

export const mutations = { useUpdateParcelStatus, useUploadImage };

export default mutations;
