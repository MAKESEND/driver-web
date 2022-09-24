import type { DropoffTask } from 'types';

interface DropoffTasklistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffTasklist: React.FC<DropoffTasklistProps> = ({
  dropoffTasks = [],
}) => {
  return <></>;
};

export default DropoffTasklist;
