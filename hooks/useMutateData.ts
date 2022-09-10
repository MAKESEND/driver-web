import type { SortParcelRequest } from 'utils/services/sortParcel';
import { useMutation } from 'react-query';
import { api } from 'utils/services';

export const useSortParcel = () => {
  return useMutation((payload: SortParcelRequest) => api.sortParcel(payload));
};

export const mutations = { useSortParcel };

export default mutations;
