import type { ParcelStatus } from 'types';

export const statusToConfirm: ParcelStatus[] = [
  'Pending' as ParcelStatus,
  'Picked up' as ParcelStatus,
  'Drop at branch' as ParcelStatus,
  'Ready to pick' as ParcelStatus,
  'In hub' as ParcelStatus,
  'Sorted' as ParcelStatus,
  'Rotating' as ParcelStatus,
];
