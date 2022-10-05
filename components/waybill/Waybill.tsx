import type { Parcel } from 'types/delivery/parcel';

export interface WaybillProps {
  parcel?: Parcel;
}

export const Waybill: React.FC<WaybillProps> = ({ parcel }) => {
  if (!parcel) return null;

  return <></>;
};

export default Waybill;
