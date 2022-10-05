import type { ParcelStatus, MSApiResponse } from 'types';

export interface ParcelPayload {
  trackingID: string;
  status: ParcelStatus;
}

export interface ParcelStatusRequest {
  shipment: ParcelPayload[];
}

export interface EndpointResponse {
  successUpdate: string[];
  successHook: string[];
  errorUpdate: string[];
}

export type ParcelStatusResponse = MSApiResponse<EndpointResponse> &
  EndpointResponse;

export type TUpdateParcelResponse = 'message' | 'successUpdate' | 'errorUpdate';

export interface UpdateParcelStatusAPI
  extends Pick<ParcelStatusResponse, TUpdateParcelResponse> {
  sorted: boolean;
}
