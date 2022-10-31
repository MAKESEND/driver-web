import type { PickupTask } from 'types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { pickupTaskProps, rounds } from 'utils/constants/delivery';
import NoTask from 'components/tasks/NoTask';
import TaskFilter from 'components/tasks/TaskFilter';
import PickupTaskList from 'components/tasks/pickup/page/PickupTaskList';
import { Divider, Typography } from '@mui/material';

export interface PickupTasksProps {
  pickupTasks?: PickupTask[];
}

export const PickupTasks: React.FC<PickupTasksProps> = ({
  pickupTasks = [],
}) => {
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
        sticky
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
