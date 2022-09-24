import type {
  Routes,
  ApiResponse,
  PickupTask,
  GooglePickupResponse,
} from 'types';
import axios from 'axios';
import getEndpoint from 'utils/services/getEndpoint';

export const getPickupTasks = async (): Promise<PickupTask[]> => {
  const endpoint = getEndpoint({ route: 'getPickupTasks' as Routes });

  try {
    if (window || typeof window !== 'undefined') {
      throw new Error('getPickupTasks is server-side only');
    }

    const {
      data: { data, status, message },
    } = await axios.post<ApiResponse<GooglePickupResponse>>(endpoint);

    if (status === 200) {
      return data?.parcelsToPick ?? [];
    } else {
      throw new Error(message);
    }
  } catch (error: any) {
    console.log("something went wrong in 'getPickupTasks'");
    console.log(error?.message ?? error);
  }

  return [];
};

export default getPickupTasks;
