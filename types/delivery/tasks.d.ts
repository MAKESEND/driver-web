import type {
  DropRound,
  ParcelSize,
  PickupRound,
  PlannerRound,
  ParcelStatus,
  TempControl,
} from 'types';

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

export interface DropoffTask {
  orderID: string;
  trackingID: string;
  parcelSize: ParcelSize;
  pickupRound: PickupRound;
  dropRound: DropRound;
  cod: number;
  temp: TempControl;
  orderDate: string;
  pickupType: string;
  userID: string | number;
  parcelChanged: boolean;
  parcelCreatedAt: string;
  parcelUpdatedAt: string;
  parcelType: string;
  PODStatus: string;
  senderName: string;
  senderNo: string;
  pickupAddress: string;
  pickupProvince: string;
  pickupDistrict: string;
  pickupPostcode: string;
  receiverName: string;
  receiverNo: string;
  dropAddress: string;
  dropProvince: string;
  dropDistrict: string;
  dropPostcode: string;
  status: ParcelStatus;
  plannerRound: PlannerRound;
  plannerHub: Hubs;
  sequence: number;
}
