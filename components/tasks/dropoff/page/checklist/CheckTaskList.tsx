import type { DropoffTask } from 'types';

export interface CheckTaskListProps {
  dropoffTasks?: DropoffTask[];
  selectedParcels?: string[];
  setSelectedParcels?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CheckTaskList: React.FC<CheckTaskListProps> = ({
  dropoffTasks = [],
}) => {
  return <></>;
};

export default CheckTaskList;
