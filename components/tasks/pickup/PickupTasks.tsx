import type { FC } from 'react';
import type { PickupTask } from 'types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Divider, Typography } from '@mui/material';
import NoTask from 'components/tasks/NoTask';
import PickupTaskList from './page/PickupTaskList';
import TaskFilter from '../TaskFilter';
import { pickupTaskProps, rounds } from 'utils/constants/delivery';

export interface PickupTasksProps {
  pickupTasks?: PickupTask[];
}

export const PickupTasks: FC<PickupTasksProps> = ({ pickupTasks = [] }) => {
  const { t } = useTranslation(['tasks', 'sorting']);
  const [filteredTasks, setFilteredTasks] = useState<PickupTask[]>([]);

  useEffect(() => {
    setFilteredTasks(pickupTasks);
  }, [pickupTasks]);

  if (!pickupTasks.length) {
    return <NoTask />;
  }

  return (
    <>
      <Typography variant="h2" sx={{ marginTop: '1rem' }}>
        {t('label.pickup')} {filteredTasks.length}&nbsp;
        {filteredTasks.length > 1 ? t('label.orders') : t('label.order')}
      </Typography>
      <TaskFilter
        scan
        tasks={pickupTasks}
        setFilteredTasks={setFilteredTasks}
        href="/scanner?type=pickup"
        fuseKeys={pickupTaskProps}
        filterOptions={rounds}
        filterKey="round"
        label={t('round', { ns: 'sorting' })}
      />
      <Divider />
      <PickupTaskList pickupTasks={filteredTasks} />
    </>
  );
};

export default PickupTasks;
