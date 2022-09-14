import type { Hubs } from './hubs';
import type {
  DropRound,
  ParcelSize,
  TempControl,
  PickupRound,
  DropRound,
  Postal,
} from './parcelMeta';

export interface Parcel {
  branch_id: null | string;
  cod: number;
  created_at: string;
  drop_id: number;
  drop_round: DropRound;
  dropoff_address: string;
  dropoff_district: string;
  dropoff_postcode: string;
  dropoff_province: string;
  dropoff_round: DropRound;
  dropoff_time: string;
  invoiceID: string;
  note: string;
  parcel_type: string;
  pickup_address: string;
  pickup_district: string;
  pickup_id: number;
  pickup_postcode: string;
  pickup_province: string;
  pickup_round: string | number;
  pickup_type: string;
  receiver_name: string;
  receiver_no: string;
  sender_name: string;
  sender_no: string;
  service_date: string;
  shipmentID: string;
  shipment_id: number;
  size: string;
  status: string;
  temp: TempControl;
  transfer_hub: Hubs;
  updated_at: string;
  user_id: number;
}

export interface ParcelToSort {
  orderID: string;
  trackingID: string;
  parcelSize: ParcelSize;
  pickupRound: PickupRound;
  dropRound: DropRound;
  cod: number;
  temp: number;
  orderDate: string;
  pickupType: string;
  userID: string;
  parcelChanged: string;
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
  status: string;
  plannerRound: number;
  plannerHub: Hubs;
  sequence: number;
  id: string;
  name: string;
  nickname: string;
  phone: string;
  vehicle_type: string;
  vehicle_type_id: number;
  service_area: string[];
  service_area_id: number[];
  round: number;
  hub: Hubs;
  rack: string;
  volume: number;
  address_id: Postal;
}

export type ParcelMixin = Partial<Parcel & ParcelToSort>;
