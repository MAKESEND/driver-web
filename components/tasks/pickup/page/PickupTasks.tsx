import { FC, useEffect } from 'react';
import type { PickupTask } from 'types';
import { useState } from 'react';
import { Divider, Typography } from '@mui/material';
import PickupTaskFilter from 'components/tasks/pickup/PickupTaskFilter';
import NoPickupTask from './NoPickupTask';
import PickupTaskList from './PickupTaskList';
import { useTranslation } from 'next-i18next';

export interface PickupTasksProps {
  pickupTasks?: PickupTask[];
}

export const PickupTasks: FC<PickupTasksProps> = ({ pickupTasks = [] }) => {
  const { t } = useTranslation('tasks');
  const [filteredTasks, setFilteredTasks] = useState<PickupTask[]>([]);

  useEffect(() => {
    setFilteredTasks(pickupTasks);
  }, [pickupTasks]);

  if (!pickupTasks.length) {
    return <NoPickupTask />;
  }

  return (
    <>
      <Typography variant="h2" sx={{ marginTop: '1rem' }}>
        {t('label.pickup')} {filteredTasks.length}{' '}
        {pickupTasks.length > 1 ? t('label.orders') : t('label.order')}
      </Typography>
      <PickupTaskFilter pickupTasks={pickupTasks} setter={setFilteredTasks} />
      <Divider />
      <PickupTaskList pickupTasks={filteredTasks} />
    </>
  );
};

export default PickupTasks;
