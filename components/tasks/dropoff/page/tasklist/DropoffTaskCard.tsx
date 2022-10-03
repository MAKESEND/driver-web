import type { DropoffTask as IDropoffTask } from 'types';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import DropoffTask from 'components/tasks/dropoff/DropoffTask';
import { Button, Card, CardContent, CardActions } from '@mui/material';

export interface DropoffTaskCardProps {
  dropoffTask: IDropoffTask;
}

export const DropoffTaskCard: React.FC<DropoffTaskCardProps> = ({
  dropoffTask,
}) => {
  const { trackingID } = dropoffTask;
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
        <DropoffTask parcel={dropoffTask} />
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
