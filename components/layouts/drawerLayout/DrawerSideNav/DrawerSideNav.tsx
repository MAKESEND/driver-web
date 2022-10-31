import { useTranslation } from 'next-i18next';
import FlexSpacer from 'components/common/FlexSpacer';
import DrawerSignout from 'components/layouts/drawerLayout/DrawerSideNav/DrawerSignout';
import DrawerSideHead from 'components/layouts/drawerLayout/DrawerSideNav/DrawerSideHead';
import DrawerSideLinks from 'components/layouts/drawerLayout/DrawerSideNav/DrawerSideLinks';
import { Drawer, Divider } from '@mui/material';

export interface DrawerSideNav {
  screenWidth?: number;
  breakPoint?: number;
  open?: boolean;
  onClose?: () => void;
}

export const DrawerSideNav: React.FC<DrawerSideNav> = ({
  screenWidth = 0,
  breakPoint = 900,
  open = false,
  onClose = () => console.warn('no callback is given to DrawerSideNav'),
}) => {
  const { t } = useTranslation('common');

  return (
    <Drawer
      anchor="left"
      variant={screenWidth > breakPoint ? 'persistent' : 'temporary'}
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiDrawer-paper': {
          width: (theme) => theme.layout.size.drawerWidth,
        },
      }}
    >
      <DrawerSideHead
        placeholder={t('sideNav.makesend')}
        // imgSrc=""
      />
      <Divider sx={{ marginTop: 0 }} />
      <DrawerSideLinks />
      <FlexSpacer />
      <Divider />
      <DrawerSignout signoutText={t('sideNav.btn.signout')} />
    </Drawer>
  );
};

export default DrawerSideNav;
