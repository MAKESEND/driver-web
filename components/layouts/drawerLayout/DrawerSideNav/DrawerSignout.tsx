import ExitIcon from '@mui/icons-material/ExitToAppOutlined';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { Router, useRouter } from 'next/router';

export interface DrawerSignoutProps {
  signoutText?: string;
}

export const DrawerSignout: React.FC<DrawerSignoutProps> = ({
  signoutText = 'Signout',
}) => {
  const router = useRouter();

  return (
    <ListItem
      button
      aria-label="logout-button"
      onClick={() => router.replace('/auth/login')}
    >
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
