import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import sideLinks from 'utils/constants/sideLinks';
import DrawerSettings from './DrawerSettings';
import getConfig from 'next/config';

import dynamic from 'next/dynamic';
const WarehouseIcon = dynamic(
  () => import('@mui/icons-material/WarehouseOutlined')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScannerOutlined')
);
const AnalyticsIcon = dynamic(
  () => import('@mui/icons-material/AnalyticsOutlined')
);
const MapIcon = dynamic(() => import('@mui/icons-material/MapOutlined'));
const BugReportIcon = dynamic(() => import('@mui/icons-material/BugReport'));

const linkIcons: { [key: string]: ReactNode } = {
  dashboard: <AnalyticsIcon />,
  warehouse: <WarehouseIcon />,
  map: <MapIcon />,
  scanner: <QrCodeScannerIcon />,
  components: <BugReportIcon />,
};

export const DrawerSideLinks: FC = () => {
  const {
    publicRuntimeConfig: { production },
  } = getConfig();
  const { t } = useTranslation('common');
  const [onPath, setOnPath] = useState<string>('');
  const { asPath } = useRouter();

  useEffect(() => {
    const paths = asPath.split('/');
    setOnPath(() => paths[paths.length - 1]);
    return () => setOnPath('');
  }, [asPath]);

  return (
    <List>
      {sideLinks.map(({ id, href }) => {
        if (production && id === 'components') return null;

        return (
          <Link key={id} href={href} passHref>
            <ListItem button selected={id === onPath}>
              <ListItemIcon>{linkIcons[id]}</ListItemIcon>
              <ListItemText>
                <Typography sx={{ textAlign: 'left' }}>
                  {t(`links.${id}`)}
                </Typography>
              </ListItemText>
            </ListItem>
          </Link>
        );
      })}
      <Divider />
      <DrawerSettings
        settingsText={t('sideNav.setting')}
        selected={onPath === 'settings'}
      />
    </List>
  );
};

export default DrawerSideLinks;
