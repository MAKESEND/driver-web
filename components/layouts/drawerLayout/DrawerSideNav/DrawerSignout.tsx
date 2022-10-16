import ExitIcon from '@mui/icons-material/ExitToAppOutlined';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSignout } from 'hooks/useMutateData';
import { useSetRecoilState } from 'recoil';
import { userDataState } from 'states';

export interface DrawerSignoutProps {
  signoutText?: string;
}

export const DrawerSignout: React.FC<DrawerSignoutProps> = ({
  signoutText = 'Signout',
}) => {
  const router = useRouter();
  const setUserData = useSetRecoilState(userDataState);
  const { mutateAsync: singout } = useSignout();

  const logout = async () => {
    try {
      const { status } = await singout();
      setUserData(null);
      if (status === 200) {
        router.replace('/auth/login');
      }
    } catch (error: any) {
      console.log('something went wrong when signingout');
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
