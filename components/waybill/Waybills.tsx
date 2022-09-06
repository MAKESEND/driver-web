import type { FC } from 'react';
import type { Parcel } from 'types/delivery/parcel';
import { Waybill } from './Waybill';

export interface WaybillsProps {
  parcels: Parcel[];
}

export const Waybills: FC<WaybillsProps> = ({ parcels }) => {
  if (!parcels.length) return null;

  return (
    <>
      {parcels.map((parcel) => (
        <Waybill key={parcel.shipmentID} parcel={parcel} />
      ))}
    </>
  );
};

export default Waybills;
