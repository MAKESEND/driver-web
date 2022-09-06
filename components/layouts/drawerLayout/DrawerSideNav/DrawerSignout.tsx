import type { FC } from 'react';
import { signOut } from 'next-auth/react';
import ExitIcon from '@mui/icons-material/ExitToAppOutlined';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';

export interface DrawerSignoutProps {
  signoutText?: string;
}

export const DrawerSignout: FC<DrawerSignoutProps> = ({
  signoutText = 'Signout',
}) => {
  return (
    <ListItem button aria-label='logout-button' onClick={() => signOut()}>
      <ListItemText>
        <Typography>{signoutText}</Typography>
      </ListItemText>
      <ListItemIcon sx={{ justifyContent: 'center' }}>
        <ExitIcon />
      </ListItemIcon>
    </ListItem>
  );
};

export default DrawerSignout;
