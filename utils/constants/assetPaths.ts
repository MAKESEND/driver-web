import type { Dictionary } from 'types/common';
import type { Routes } from 'types/routes';

export interface IAssetPaths extends Dictionary {
  legacy: { [route in Routes]?: string };
}

export const assetPaths: IAssetPaths = {
  getParcelsByOrderId: `/driver-app/parcelsbyorderid`,
  checkDropoffRounds: `/micros/hub/api/dropround/checkround`,
  checkTransferHub: `/micros/hub/api/hubtransfer/checkhub`,
  legacy: {
    getParcelsByTrackingIds: `/api/google/makesend/getShipmentByTrackingID`,
  },
};

export default assetPaths;
