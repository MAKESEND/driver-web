import type { DropRound, PickupTask } from 'types';

export const rounds: DropRound[] = [1, 2];

export const pickupTaskProps: (keyof PickupTask)[] = [
  'order',
  'order_id',
  'sender_name',
  'sender_phone',
  'parcel_count',
  'sender_address',
  'driver_id',
  'round',
  'seq',
];
