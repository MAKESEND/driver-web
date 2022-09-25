import type { DropoffTask } from 'types';
import { useState, useEffect } from 'react';
import NoTask from 'components/tasks/NoTask';
import DropoffSummary from './tasklist/DropoffSummary';
import DropoffTaskFilter from './tasklist/DropoffTaskFilter';
import DropoffTaskList from './tasklist/DropoffTaskList';

export interface DropoffTasklistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffTasklist: React.FC<DropoffTasklistProps> = ({
  dropoffTasks = [],
}) => {
  const [filteredTasks, setFilteredTasks] = useState<DropoffTask[]>([]);

  useEffect(() => {
    setFilteredTasks(dropoffTasks);
    return () => setFilteredTasks([]);
  }, [dropoffTasks]);

  if (!dropoffTasks.length) {
    return <NoTask />;
  }

  return (
    <>
      <DropoffSummary
        dropoffTasks={dropoffTasks}
        filteredTasks={filteredTasks}
      />
      <DropoffTaskFilter />
      <DropoffTaskList dropoffTasks={filteredTasks} />
    </>
  );
};

export default DropoffTasklist;
