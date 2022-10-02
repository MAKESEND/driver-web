import type { ParcelByTrackingId } from 'types';

export interface DropoffTaskProps {
  parcel?: ParcelByTrackingId;
}

export const DropoffTask: React.FC<DropoffTaskProps> = ({ parcel }) => {
  return <></>;
};

export default DropoffTask;
