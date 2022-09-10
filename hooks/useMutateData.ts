import type { ParcelStatusRequest } from 'types';
import { useMutation } from 'react-query';
import { api } from 'utils/services';

export const useUpdateParcelStatus = () => {
  return useMutation((payload: ParcelStatusRequest) =>
    api.updateParcelStatus(payload)
  );
};

export const mutations = { useUpdateParcelStatus };

export default mutations;
