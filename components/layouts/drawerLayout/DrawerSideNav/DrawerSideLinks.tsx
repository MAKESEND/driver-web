import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Divider, List } from '@mui/material';
import sideLinks from 'utils/constants/sideLinks';
import DrawerSettings from './DrawerSettings';
import { SingleLink, NestedLink } from './links';

export const DrawerSideLinks: FC = () => {
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
      {sideLinks.map(({ links, id, ...props }) => {
        return props.href ? (
          <SingleLink key={id} id={id} {...props} />
        ) : Array.isArray(links) && links.length > 0 ? (
          <NestedLink key={id} id={id} links={links} />
        ) : null;
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
