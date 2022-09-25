import type { DropoffTask } from 'types';
import { List } from '@mui/material';
import CollectlistCard from './CollectlistCard';

export interface CollectlistProps {
  dropoffTasks?: DropoffTask[];
  selectedParcels?: string[];
  setSelectedParcels?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Collectlist: React.FC<CollectlistProps> = ({
  dropoffTasks = [],
  selectedParcels = [],
  setSelectedParcels = () =>
    console.warn('no setSelectedParcels given to Collectlist'),
}) => {
  return (
    <List disablePadding>
      {dropoffTasks.map((task) => (
        <CollectlistCard
          key={task.trackingID}
          parcel={task}
          selectedParcels={selectedParcels}
          setSelectedParcels={setSelectedParcels}
        />
      ))}
    </List>
  );
};

export default Collectlist;
