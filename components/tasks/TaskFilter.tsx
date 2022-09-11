import type { Dispatch, FC, SetStateAction } from 'react';

export interface TaskFilterProps {
  tasks?: any[];
  setter?: Dispatch<SetStateAction<any[]>>;
}

export const TaskFilter: FC<TaskFilterProps> = ({
  tasks = [],
  setter = () => console.warn('no setter is given to TaskFilter'),
}) => {
  return null;
};

export default TaskFilter;
