import type { PickupTask } from 'types';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FlexSpacer } from 'components/common/FlexSpacer';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';

export interface PickupTaskCardProps {
  pickupTask?: PickupTask;
}

export const PickupTaskCard: React.FC<PickupTaskCardProps> = ({
  pickupTask,
}) => {
  const { t } = useTranslation('tasks');

  if (!pickupTask) return null;

  const {
    seq,
    sender_name,
    sender_phone,
    sender_address,
    parcel_count,
    order_id,
  } = pickupTask;

  return (
    <Card>
      <CardContent
        sx={{
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h3">
          {seq ? `${seq}.` : ''} {sender_name}
        </Typography>
        <Button variant="outlined">{t('btn.skip')}</Button>
      </CardContent>
      <CardContent
        sx={{
          width: '100%',
          display: 'inline-flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography variant="secondary" textAlign="start">
            {t('label.phone')} &nbsp;
            <a href={`tel:${sender_phone}`}>{sender_phone}</a>
          </Typography>
          <Typography variant="secondary" textAlign="start">
            {parcel_count}&nbsp;
            {+parcel_count > 1 ? t('label.pcs') : t('label.pc')}
          </Typography>
        </Box>
        <Typography variant="secondary" textAlign="start">
          {t('label.orderId')}: {order_id}
        </Typography>
        <Typography variant="secondary" textAlign="start">
          {t('label.address')}:&nbsp;
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
              sender_address
            )}`}
            rel="noreferrer"
            target="_blank"
          >
            {sender_address}
          </a>
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 2 }}>
        <FlexSpacer />
        <Link href={`/tasks/pickup/${order_id}`} passHref>
          <Button variant="outlined">{t('btn.details')}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
