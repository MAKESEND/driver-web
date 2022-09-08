import type { FC, ReactNode } from 'react';
import type { ParcelMixin } from 'types';
import { useTranslation } from 'next-i18next';
import { CardContent, styled, Typography } from '@mui/material';
import MobileCard from 'components/common/mobile/MobileCard';

const SecondaryText = styled(Typography)((theme) => ({
  textAlign: 'start',
  color: 'rgba(0, 0, 0, 0.6)',
}));

export type ParcelCardProps<T = ParcelMixin> = T & {
  Note?: ReactNode;
};

const ParcelCard: FC<ParcelCardProps> = ({
  trackingID = 'No trackingID',
  senderName = 'No sender name',
  senderNo = 'No sender phone',
  status = 'No status',
  Note,
}) => {
  const { t } = useTranslation('parcel');

  return (
    <MobileCard>
      <CardContent>
        <Typography variant="h2">{trackingID}</Typography>
      </CardContent>
      <CardContent>
        <SecondaryText>{`${t('receiver')} ${senderName}`}</SecondaryText>
        <SecondaryText>{`${t('receiver')} ${t(
          'phone'
        )} ${senderNo}`}</SecondaryText>
        <SecondaryText>{`${t('status')} ${status}`}</SecondaryText>
      </CardContent>
      {Note && <CardContent>{Note}</CardContent>}
    </MobileCard>
  );
};

export default ParcelCard;
