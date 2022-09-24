import type { DropoffTask } from 'types';
import type { CheckTaskListProps } from './CheckTaskList';

export interface ChecklistFilterProps extends CheckTaskListProps {
  filteredParcels?: DropoffTask[];
  setFilteredParcels?: React.Dispatch<React.SetStateAction<DropoffTask[]>>;
}

export const ChecklistFilter: React.FC<ChecklistFilterProps> = ({
  dropoffTasks = [],
  selectedParcels = [],
  setSelectedParcels = () =>
    console.warn('no setSelectedParcels given to ChecklistFilter'),
  filteredParcels = [],
  setFilteredParcels = () =>
    console.warn('no setFilteredParcels given to ChecklistFilter'),
}) => {
  return <></>;
};

export default ChecklistFilter;
