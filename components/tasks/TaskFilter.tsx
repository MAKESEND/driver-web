import type { Dispatch, FC, SetStateAction } from 'react';
import { Parcel } from 'types';

export interface TaskFilterProps {
  tasks?: Parcel[];
  setter?: Dispatch<SetStateAction<Parcel[]>>;
}

export const TaskFilter: FC<TaskFilterProps> = ({
  tasks = [],
  setter = () => console.warn('no setter is given to TaskFilter'),
}) => {
  return null;
};

export default TaskFilter;
