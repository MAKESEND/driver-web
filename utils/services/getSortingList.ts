import type { Routes, ParcelToSort, ApiResponse } from 'types';
import axios from 'axios';
import getEndpoint from 'utils/services/getEndpoint';

export const getSortingList = async () => {
  let parcelsToSort: ParcelToSort[] = [];
  const endpoint = getEndpoint({ route: 'getSortingList' as Routes });
  try {
    const {
      data: { status, data, message },
    } = await axios.get<ApiResponse<ParcelToSort[]>>(endpoint);
    if (status === 200) {
      parcelsToSort = data;
    } else {
      throw new Error(message);
    }
  } catch (error: any) {
    console.log("something went wrong in 'getSortingList'");
    console.log(error?.message ?? error);
  }

  return parcelsToSort;
};

export default getSortingList;
