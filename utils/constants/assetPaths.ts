import type { Routes } from 'types';

type RouteDict = { [key in Routes]?: string };
export interface IAssetPaths extends RouteDict {
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
  legacy: {
    getParcelsByTrackingIds: `/api/google/makesend/getShipmentByTrackingID`,
  },
};

export default assetPaths;
