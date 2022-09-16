import type { Dispatch, FC, SetStateAction } from 'react';
import type { Parcel } from 'types';
import { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';

export interface PickupParcelCardProps {
  parcel: Parcel;
  selectedParcels?: string[];
  setter?: Dispatch<SetStateAction<string[]>>;
}

export const PickupParcelCard: FC<PickupParcelCardProps> = ({
  parcel: {
    shipmentID,
    temp,
    status,
    receiver_name,
    receiver_no,
    dropoff_district,
    dropoff_postcode,
  },
  selectedParcels = [],
  setter = () => console.warn('no setter given to PickupParcelCard'),
}) => {
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
          gap: (t) => t.spacing(2),
          border: '#ccc solid 1px',
          borderRadius: '12px',
        }}
      >
        <Checkbox checked={checked} sx={{ height: (t) => t.spacing(5) }} />
        <Box sx={{ padding: (t) => t.spacing(1) }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui provident
          saepe delectus pariatur hic aspernatur modi culpa libero minus, earum
          quia quaerat, quod temporibus explicabo obcaecati illum quas
          repellendus eaque?
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default PickupParcelCard;
