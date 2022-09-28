import type { DropoffTask } from 'types';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ReceiverParcel from './dropofftask-card/ReceiverParcel';
import ReceiverPhone from './dropofftask-card/ReceiverPhone';
import ReceiverPostal from './dropofftask-card/ReceiverPostal';
import ReceiverAddress from './dropofftask-card/ReceiverAddress';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  styled,
} from '@mui/material';

export const Row = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export interface DropoffTaskCardProps {
  dropoffTask: DropoffTask;
}

export const DropoffTaskCard: React.FC<DropoffTaskCardProps> = ({
  dropoffTask,
}) => {
  const {
    sequence,
    trackingID,
    status,
    receiverName,
    receiverNo,
    dropAddress,
    dropDistrict,
    dropProvince,
    dropPostcode,
  } = dropoffTask;
  const { t } = useTranslation('tasks');

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: (t) => t.spacing(1),
        }}
      >
        <ReceiverParcel
          sequence={sequence}
          trackingID={trackingID}
          status={status}
        />
        <Typography sx={{ textAlign: 'start' }}>{receiverName}</Typography>
        <ReceiverPhone receiverPhone={receiverNo} />
        <ReceiverPostal
          dropDistrict={dropDistrict}
          dropProvince={dropProvince}
          dropPostcode={dropPostcode}
        />
        <ReceiverAddress dropAddress={dropAddress} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        <Link href={`/tasks/dropoff/${trackingID}`} passHref>
          <Button variant="outlined">{t('btn.details')}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default DropoffTaskCard;
