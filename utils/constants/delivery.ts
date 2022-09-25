import type { DropRound, Parcel, PickupTask } from 'types';
import { ParcelSize } from 'types/delivery';

export const rounds: DropRound[] = [1, 2];

export const parcelSizes = Object.values(ParcelSize);

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

export const pickupParcelProps: (keyof Parcel)[] = [
  'branch_id',
  'cod',
  'created_at',
  'drop_id',
  'drop_round',
  'dropoff_address',
  'dropoff_district',
  'dropoff_postcode',
  'dropoff_province',
  'dropoff_round',
  'dropoff_time',
  'invoiceID',
  'note',
  'parcel_type',
  'pickup_address',
  'pickup_district',
  'pickup_id',
  'pickup_postcode',
  'pickup_province',
  'pickup_round',
  'pickup_type',
  'receiver_name',
  'receiver_no',
  'sender_name',
  'sender_no',
  'service_date',
  'shipmentID',
  'shipment_id',
  'size',
  'status',
  'temp',
  'transfer_hub',
  'updated_at',
  'user_id',
];
