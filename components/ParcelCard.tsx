import type { ParcelMixin } from 'types';
import { useTranslation } from 'next-i18next';
import MobileCard from 'components/common/mobile/MobileCard';
import { CardActions, CardContent, styled, Typography } from '@mui/material';

const SecondaryText = styled(Typography)(() => ({
  textAlign: 'start',
  color: 'rgba(0, 0, 0, 0.6)',
}));

export type ParcelCardProps<T = ParcelMixin> = T & {
  Note?: React.ReactNode;
  Actions?: React.ReactNode;
};

const ParcelCard: React.FC<ParcelCardProps> = ({
  trackingID = 'No trackingID',
  senderName = 'No sender name',
  senderNo = 'No sender phone',
  status = 'No status',
  Note,
  Actions,
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
      {Actions && (
        <CardActions sx={{ justifyContent: 'center', gap: 2 }}>
          {Actions}
        </CardActions>
      )}
    </MobileCard>
  );
};

export default ParcelCard;
