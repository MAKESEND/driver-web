import type { Hubs } from './hubs';
import type { DropRound, TempControl } from './parcelMeta';

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
  pickup_round: string;
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
