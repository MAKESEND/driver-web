export enum Routes {
  checkDropoffRounds = 'checkDropoffRounds',
  checkTransferHub = 'checkTransferHub',
  getPickupTasks = 'getPickupTasks',
  getDropoffTasks = 'getDropoffTasks',
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
