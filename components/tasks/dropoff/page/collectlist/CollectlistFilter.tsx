import type { DropoffTask } from 'types';
import type { CollectlistProps } from './Collectlist';

export interface CollectlistFilterProps extends CollectlistProps {
  filteredParcels?: DropoffTask[];
  setFilteredParcels?: React.Dispatch<React.SetStateAction<DropoffTask[]>>;
}

export const CollectlistFilter: React.FC<CollectlistFilterProps> = ({
  dropoffTasks = [],
  selectedParcels = [],
  setSelectedParcels = () =>
    console.warn('no setSelectedParcels given to CollectlistFilter'),
  filteredParcels = [],
  setFilteredParcels = () =>
    console.warn('no setFilteredParcels given to CollectlistFilter'),
}) => {
  return <></>;
};

export default CollectlistFilter;
