import type { ParcelStatus, MSApiResponse } from 'types';

export interface ParcelPayload {
  trackingID: string;
  status: ParcelStatus;
}

export interface ParcelStatusRequest {
  shipment: ParcelPayload[];
}

interface EndpointResponse {
  successUpdate: string[];
  successHook: string[];
  errorUpdate: string[];
}

export type ParcelStatusResponse = MSApiResponse<EndpointResponse> &
  EndpointResponse;
