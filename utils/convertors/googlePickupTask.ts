import type { PickupTask } from 'types';

interface GooglePickupRawResponse {
  parcelsToPick: string[][];
  parcelsToPickHeaders: string[];
}

export const googlePickupTask = (
  res: GooglePickupRawResponse
): PickupTask[] => {
  let tasks: PickupTask[] = [];

  if (res?.parcelsToPick && res?.parcelsToPickHeaders) {
    const orders = res.parcelsToPick.map((parcel) => {
      const item: { [key: string]: string } = {};

      res.parcelsToPickHeaders.forEach((header, index) => {
        item[header] = parcel[index];
      });

      return item;
    });

    tasks = orders as unknown as PickupTask[];
  }

  return tasks;
};

export default googlePickupTask;
