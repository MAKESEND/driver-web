import type { DropoffTask } from 'types';
import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';

export interface DropoffSummaryProps {
  dropoffTasks?: DropoffTask[];
  filteredTasks?: DropoffTask[];
}

export const DropoffSummary: React.FC<DropoffSummaryProps> = ({
  // dropoffTasks = [],
  filteredTasks = [],
}) => {
  const { t } = useTranslation('tasks');

  return (
    <Typography variant="h2" sx={{ marginTop: '1rem' }}>
      {t('label.deliver')} {filteredTasks.length}&nbsp;
      {filteredTasks.length > 1 ? t('label.parcels') : t('label.parcel')}
    </Typography>
  );
};

export default DropoffSummary;
