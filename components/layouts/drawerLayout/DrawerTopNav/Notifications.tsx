import type { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { notifactionState, updateBodyState } from 'states';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
const NotificationsIcon = dynamic(
  () => import('@mui/icons-material/Notifications')
);

export const Notifications: FC = () => {
  const { t } = useTranslation('common');
  const updates = useRecoilValue(updateBodyState);
  const notifications = useRecoilValue(notifactionState);
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="notification" color="inherit" onClick={onOpen}>
        <Badge badgeContent={notifications} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            component="h2"
            sx={{ textAlign: 'start', paddingX: '1rem' }}
          >
            {t('topNav.notification.notifications')}
          </Typography>
          <Button>{t('topNav.notification.read')}</Button>
        </Box>
        <Divider />
        {updates.map(({ id, message, imgSrc }) => {
          return (
            <MenuItem
              key={id}
              sx={{ maxWidth: '80vw', minWidth: '15rem', height: '3.25rem' }}
            >
              {!!imgSrc && (
                <Avatar src={imgSrc} alt={message} variant="rounded" />
              )}
              <Typography
                sx={{
                  flexGrow: 1,
                  textAlign: 'start',
                  ...(imgSrc && { marginLeft: '1rem' }),
                }}
              >
                {message}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default Notifications;
