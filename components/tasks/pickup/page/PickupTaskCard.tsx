import type { FC } from 'react';
import type { PickupTask } from 'types';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  styled,
} from '@mui/material';
import { FlexSpacer } from 'components/common/FlexSpacer';

export interface PickupTaskCardProps {
  pickupTask?: PickupTask;
}

const TaskContent = styled(Typography)(() => ({
  fontSize: '0.875rem',
  textAlign: 'start',
  color: 'rgba(0,0,0,0.6)',
}));

export const PickupTaskCard: FC<PickupTaskCardProps> = ({ pickupTask }) => {
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
        <TaskContent variant="h3">
          {seq ? `${seq}.` : ''} {sender_name}
        </TaskContent>
        <Button variant="outlined">{t('btn.skip')}</Button>
      </CardContent>
      <CardContent
        sx={{
          width: '100%',
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '0.5rem',
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
          <TaskContent>
            {t('label.phone')} &nbsp;
            <a href={`tel:${sender_phone}`}>{sender_phone}</a>
          </TaskContent>
          <TaskContent>
            {parcel_count}&nbsp;
            {+parcel_count > 1 ? t('label.pcs') : t('label.pc')}
          </TaskContent>
        </Box>
        <TaskContent>
          {t('label.orderId')}: {order_id}
        </TaskContent>
        <TaskContent>
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
        </TaskContent>
      </CardContent>
      <CardActions>
        <FlexSpacer />
        <Link href={`/tasks/pickup/${order_id}`} passHref>
          <Button variant="outlined">{t('btn.details')}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
