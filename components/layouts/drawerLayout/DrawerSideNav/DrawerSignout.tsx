import ExitIcon from '@mui/icons-material/ExitToAppOutlined';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSignout } from 'hooks/useMutateData';

export interface DrawerSignoutProps {
  signoutText?: string;
}

export const DrawerSignout: React.FC<DrawerSignoutProps> = ({
  signoutText = 'Signout',
}) => {
  const router = useRouter();
  const { mutateAsync: singout } = useSignout();

  return (
    <ListItem
      button
      aria-label="logout-button"
      onClick={async () => {
        try {
          const { status } = await singout();
          if (status === 200) {
            router.replace('/auth/login');
          }
        } catch (error: any) {
          console.log('something went wrong when signingout');
          console.warn(error.message ?? error);
        }
      }}
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
