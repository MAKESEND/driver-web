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
  let parcels: PickupTask[] = [];

  try {
    const {
      data: { data, status, message },
    } = await axios.post<ApiResponse<GooglePickupResponse>>(endpoint);

    if (status === 200) {
      parcels = data?.parcelsToPick ?? parcels;
    } else {
      throw new Error(message);
    }
  } catch (error: any) {
    console.log("something went wrong in 'getPickupTasks'");
    console.log(error?.message ?? error);
  }

  return parcels;
};

export default getPickupTasks;
