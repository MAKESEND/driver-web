export interface MediaList {
  id: string;
  hint: string;
}

export interface PickupTask {
  order: string;
  order_id: string;
  sender_name: string;
  sender_phone: string;
  parcel_count: string;
  sender_address: string;
  driver_id: string;
  round: string;
  seq: string;
}

export interface GooglePickupResponse {
  parcelsToPick: PickupTask[];
}
