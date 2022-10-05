import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import LinkIcons from './LinkIcons';

export interface SingleLinkProps {
  id: string;
  group?: string;
  href?: string;
  onPath?: string;
  disabled?: boolean;
}

export const SingleLink: React.FC<SingleLinkProps> = ({
  id,
  group,
  href = '/',
  onPath,
  disabled = false,
}) => {
  const { t } = useTranslation('common');

  return (
    <Link href={href} passHref>
      <ListItem button selected={id === onPath} disabled={disabled}>
        <ListItemIcon>{LinkIcons[id]}</ListItemIcon>
        <ListItemText>
          <Typography sx={{ textAlign: 'left' }}>
            {t(`links${group ? `.${group}` : ''}.${id}`)}
          </Typography>
        </ListItemText>
      </ListItem>
    </Link>
  );
};

export default SingleLink;
