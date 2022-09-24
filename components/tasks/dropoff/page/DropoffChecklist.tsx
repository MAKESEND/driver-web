import type { DropoffTask } from 'types';

interface DropoffChecklistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffChecklist: React.FC<DropoffChecklistProps> = ({
  dropoffTasks = [],
}) => {
  return <></>;
};

export default DropoffChecklist;
