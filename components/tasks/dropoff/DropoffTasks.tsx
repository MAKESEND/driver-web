import type { DropoffTask } from 'types';

export interface DropoffTasksProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffTasks: React.FC<DropoffTasksProps> = ({
  dropoffTasks = [],
}) => {
  return <></>;
};

export default DropoffTasks;
