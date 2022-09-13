export interface MediaList {
  id: string;
  hint: string;
}

export interface PickupTask {
  order_id: string;
  sender_name: string;
  sender_phone: string;
  parcel_count: string;
  sender_address: string;
  driver_id: string;
  round: string;
  order?: string; // order and seq are duplicates
  seq?: string;
}

export interface GooglePickupResponse {
  parcelsToPick: PickupTask[];
}
