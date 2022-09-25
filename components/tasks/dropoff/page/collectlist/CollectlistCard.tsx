import type { DropoffTask } from 'types';
import { useState, useEffect } from 'react';
import { Checkbox, ListItem, ListItemButton } from '@mui/material';
import CollectlistCardContent from './CollectlistCardContent';
import { statusToConfirm } from 'utils/constants/tasks';

export interface CollectlistCardProps {
  disabled?: boolean;
  parcel: DropoffTask;
  selectedParcels?: string[];
  setSelectedParcels?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CollectlistCard: React.FC<CollectlistCardProps> = ({
  disabled = false,
  parcel,
  selectedParcels = [],
  setSelectedParcels = () =>
    console.warn('no setSelectedParcels given to CollectlistCard'),
}) => {
  const { trackingID, status } = parcel;
  const [checked, setChecked] = useState(false);

  const onClick = () => {
    setChecked((val) => !val);

    checked
      ? setSelectedParcels((vals) => vals.filter((val) => val !== trackingID))
      : setSelectedParcels((vals) => [...vals, trackingID]);
  };

  useEffect(() => {
    const isSelected = selectedParcels.includes(trackingID);
    setChecked(isSelected);

    return () => setChecked(false);
  }, [trackingID, selectedParcels]);

  return (
    <ListItem disableGutters>
      <ListItemButton
        disabled={disabled || !statusToConfirm.includes(status)}
        onClick={onClick}
        sx={{
          display: 'flex',
          gap: (t) => t.spacing(1),
          border: '#ccc solid 1px',
          borderRadius: '12px',
          paddingLeft: 0,
          paddingRight: (t) => t.spacing(1),
        }}
      >
        <Checkbox checked={checked} sx={{ height: (t) => t.spacing(5) }} />
        <CollectlistCardContent parcel={parcel} />
      </ListItemButton>
    </ListItem>
  );
};

export default CollectlistCard;
