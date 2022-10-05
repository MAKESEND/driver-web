import type { ParcelStatus } from 'types';
import { Chip, Typography } from '@mui/material';
import Row from 'components/common/Row';

export interface ReceiverParcelProps {
  sequence?: number;
  trackingID: string;
  status: ParcelStatus;
}

export const ReceiverParcel: React.FC<ReceiverParcelProps> = ({
  sequence,
  trackingID,
  status,
}) => {
  return (
    <Row>
      <Typography variant="h3" sx={{ textAlign: 'start' }}>
        {sequence ? `${sequence}.` : ''} {trackingID}
      </Typography>
      <Chip label={status} />
    </Row>
  );
};

export default ReceiverParcel;
