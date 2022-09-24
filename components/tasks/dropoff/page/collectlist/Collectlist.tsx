import type { DropoffTask } from 'types';

export interface CollectlistProps {
  dropoffTasks?: DropoffTask[];
  selectedParcels?: string[];
  setSelectedParcels?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Collectlist: React.FC<CollectlistProps> = ({
  dropoffTasks = [],
}) => {
  return <></>;
};

export default Collectlist;
