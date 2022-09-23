export enum Routes {
  checkDropoffRounds = 'checkDropoffRounds',
  checkTransferHub = 'checkTransferHub',
  getPickupTasks = 'getPickupTasks',
  getParcelsByOrderId = 'getParcelsByOrderId',
  getParcelsByTrackingIds = 'getParcelsByTrackingIds',
  getSortingList = 'getSortingList',
  sortParcel = 'sortParcel',
  uploadImg = 'uploadImg',
  updateParcelStatus = 'updateParcelStatus',
}

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}
