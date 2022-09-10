export enum Routes {
  getParcelsByOrderId = 'getParcelsByOrderId',
  checkDropoffRounds = 'checkDropoffRounds',
  checkTransferHub = 'checkTransferHub',
  getParcelsByTrackingIds = 'getParcelsByTrackingIds',
  getSortingList = 'getSortingList',
  sortParcel = 'sortParcel',
}

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}
