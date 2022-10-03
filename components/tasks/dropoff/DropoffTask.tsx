import type {
  DropoffTask as IDropoffTask,
  ParcelByTrackingId,
  ParcelStatus,
} from 'types';
import { Typography } from '@mui/material';
import { ReceiverAddress } from 'components/tasks/dropoff/dropofftask-card/ReceiverAddress';
import { ReceiverParcel } from 'components/tasks/dropoff/dropofftask-card/ReceiverParcel';
import { ReceiverPhone } from 'components/tasks/dropoff/dropofftask-card/ReceiverPhone';
import { ReceiverPostal } from 'components/tasks/dropoff/dropofftask-card/ReceiverPostal';

type DropTaskMixin = Partial<ParcelByTrackingId & IDropoffTask>;
export interface DropoffTaskProps {
  parcel?: DropTaskMixin;
}

export const DropoffTask: React.FC<DropoffTaskProps> = ({ parcel }) => {
  if (!parcel) return null;

  const {
    sequence,
    trackingID,
    status,
    dropAddress,
    dropPostcode,
    dropDistrict,
    dropProvince,
    receiverNo,
    receiverName,
  } = parcel;

  return (
    <>
      <ReceiverParcel
        sequence={sequence}
        trackingID={trackingID as string}
        status={status as ParcelStatus}
      />
      <Typography sx={{ textAlign: 'start' }}>{receiverName}</Typography>
      <ReceiverPhone receiverPhone={receiverNo as string} />
      <ReceiverPostal
        dropDistrict={dropDistrict as string}
        dropProvince={dropProvince as string}
        dropPostcode={dropPostcode as string}
      />
      <ReceiverAddress dropAddress={dropAddress as string} />
    </>
  );
};

export default DropoffTask;
