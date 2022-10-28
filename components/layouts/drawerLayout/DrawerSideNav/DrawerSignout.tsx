import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';
import { useSignout } from 'hooks/useMutateData';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';

import dynamic from 'next/dynamic';
const ExitIcon = dynamic(() => import('@mui/icons-material/ExitToAppOutlined'));

export interface DrawerSignoutProps {
  signoutText?: string;
}

export const DrawerSignout: React.FC<DrawerSignoutProps> = ({
  signoutText = 'Signout',
}) => {
  const router = useRouter();
  const [, setUserData] = useUser();
  const { mutateAsync: singout } = useSignout();

  const logout = async () => {
    try {
      const { status } = await singout();
      setUserData(null);
      if (status === 200) {
        router.replace('/auth/login');
      }
    } catch (error: any) {
      console.log('something went wrong when signing out');
      console.warn(error.message ?? error);
    }
  };

  return (
    <ListItem button aria-label="logout-button" onClick={logout}>
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
