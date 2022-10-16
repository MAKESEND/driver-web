import type { ScannerMode } from 'types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import SideDrawer from '../common/SideDrawer';
import {
  Box,
  Button,
  IconButton as MuiIconButton,
  styled,
  Typography,
} from '@mui/material';

const IconButton = styled(MuiIconButton)(() => ({
  width: '100%',
  height: '100%',
  maxWidth: '350px',
  maxHeight: '350px',
}));

import dynamic from 'next/dynamic';
const Scanner = dynamic(() => import('./Scanner'), { ssr: false });
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

const Container = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export interface ScannerPanelProps {
  mode?: keyof typeof ScannerMode;
}

export const ScannerPanel: React.FC<ScannerPanelProps> = ({ mode }) => {
  const { t } = useTranslation(['scanner', 'common']);
  const router = useRouter();
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setIsScanning(false);
      setIsDenied(false);
    };
  }, []);

  return (
    <>
      <Scanner
        isScanning={isScanning}
        setIsScanning={setIsScanning}
        setIsDenied={setIsDenied}
      />
      <SideDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <Container>
        {isDenied ? (
          <Box>
            <Typography variant="body1">{t('title.cameraDenied')}</Typography>
            <Button onClick={() => router.reload()}>{t('btn.reload')}</Button>
          </Box>
        ) : (
          <>
            <IconButton
              size="large"
              disabled={isScanning}
              aria-label="qr-reader-button"
              onClick={() => {
                setIsScanning((oldVal) => !oldVal);
              }}
            >
              <QrCodeScannerIcon
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </IconButton>
            <Typography>{t('title.tapToScan')}</Typography>
          </>
        )}
      </Container>
    </>
  );
};

export default ScannerPanel;
