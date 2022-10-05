import type { Dispatch, FC, SetStateAction } from 'react';
import type { Parcel } from 'types';
import { useState, useEffect } from 'react';
import { Checkbox, ListItem, ListItemButton } from '@mui/material';
import PickupCardContent from './PickupCardContent';

export interface PickupParcelCardProps {
  parcel: Parcel;
  selectedParcels?: string[];
  setter?: Dispatch<SetStateAction<string[]>>;
}

export const PickupParcelCard: FC<PickupParcelCardProps> = ({
  parcel,
  selectedParcels = [],
  setter = () => console.warn('no setter given to PickupParcelCard'),
}) => {
  const { shipmentID } = parcel;
  const [checked, setChecked] = useState(false);

  const onClick = () => {
    setChecked((val) => !val);

    checked
      ? setter((vals) => vals.filter((val) => val !== shipmentID))
      : setter((vals) => [...vals, shipmentID]);
  };

  useEffect(() => {
    const isSelected = selectedParcels.includes(shipmentID);
    setChecked(isSelected);

    return () => setChecked(false);
  }, [shipmentID, selectedParcels]);

  return (
    <ListItem disableGutters>
      <ListItemButton
        disableGutters
        onClick={onClick}
        sx={{
          display: 'flex',
          gap: (t) => t.spacing(1),
          border: '#ccc solid 1px',
          borderRadius: '12px',
        }}
      >
        <Checkbox checked={checked} sx={{ height: (t) => t.spacing(5) }} />
        <PickupCardContent parcel={parcel} />
      </ListItemButton>
    </ListItem>
  );
};

export default PickupParcelCard;
