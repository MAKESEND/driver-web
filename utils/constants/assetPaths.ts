import type { Routes } from 'types';

type RouteDict = { [key in Routes]?: string };
export interface IAssetPaths extends RouteDict {
  merchant: RouteDict;
  legacy: RouteDict;
}

export const assetPaths: IAssetPaths = {
  getParcelsByOrderId: `/driver-app/parcelsbyorderid`,
  getPickupTasks: '/driver-app/pickuptasks/all', // google sheets
  getDropoffTasks: '/micros/parcel/dropoff/dispatching/get', // Parcel Planner, /micros/parcel/dropoff/dispatching/get/[driver_id]
  checkDropoffRounds: `/micros/hub/api/dropround/checkround`,
  checkTransferHub: `/micros/hub/api/hubtransfer/checkhub`,
  getSortingList: '/micros/parcel/dropoff/sorting/get/EX',
  uploadImg: '/apiold/api/delivery/uploadPOD',
  driverAuth: '/drivers/authorized',
  driverCheckin: '/drivers/checkin',
  driversRoot: '/drivers',
  merchant: {
    getParcelsByTrackingIds: `/api/google/makesend/getShipmentByTrackingID`,
  },
  legacy: {
    getParcelsByDate: `/api/google/makesend/order/fetch`,
  },
};

export default assetPaths;
