import { useState, useEffect } from 'react';
import { useNetworkState } from 'react-use';
import { useTranslation } from 'next-i18next';
import { Alert, Snackbar } from '@mui/material';

import dynamic from 'next/dynamic';
const SignalWifiOffIcon = dynamic(
  () => import('@mui/icons-material/SignalWifiOff')
);
const SignalWifiIcon = dynamic(
  () => import('@mui/icons-material/SignalWifiStatusbar4Bar')
);

export const OnlineIndicator: React.FC = () => {
  const state = useNetworkState();
  const { t } = useTranslation('common');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(() => {
      if (
        typeof state.previous === 'boolean' &&
        state.online !== state.previous
      ) {
        return true;
      }
      return false;
    });
  }, [state]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => {
        if (state.online) {
          setOpen(false);
        }
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        variant="outlined"
        onClose={() => setOpen(false)}
        severity={state.online ? 'success' : 'error'}
        iconMapping={{
          success: <SignalWifiIcon />,
          error: <SignalWifiOffIcon />,
        }}
      >
        {t(`hint.${state.online ? 'online' : 'offline'}`)}
      </Alert>
    </Snackbar>
  );
};

export default OnlineIndicator;
