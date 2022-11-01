import type { ScannerConfig } from 'types';
import { ScannerMode, ScannerType } from 'types/scanner.d';
import { useTranslation } from 'next-i18next';
import {
  Grid,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Typography,
} from '@mui/material';

import dynamic from 'next/dynamic';
const Select = dynamic(() => import('@mui/material/Select'));
const ScannerSelect = dynamic(
  () => import('components/scanner/buttons/ScannerSelect')
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

const modes = Object.keys(ScannerMode) as ScannerMode[];
const types = Object.keys(ScannerType) as ScannerType[];

export interface ScannerButtonsProps {
  isScanning?: boolean;
  setIsScanning?: React.Dispatch<React.SetStateAction<boolean>>;
  scannerConfig?: ScannerConfig;
  setScannerConfig?: React.Dispatch<React.SetStateAction<ScannerConfig>>;
}

export const ScannerButtons: React.FC<ScannerButtonsProps> = ({
  isScanning = false,
  setIsScanning = () => console.warn('no setIsScanning given ScannerButtons'),
  scannerConfig = null,
  setScannerConfig = () =>
    console.warn('no setScannerConfig given ScannerButtons'),
}) => {
  const { t } = useTranslation(['scanner', 'common']);

  return (
    <>
      <Grid
        container
        gap={2}
        sx={{
          width: '100%',
          maxWidth: (theme) => theme.layout.size.btnMaxWidth,
          justifyContent: 'center',
        }}
      >
        <Grid item xs={5}>
          <ScannerSelect
            optionType="type"
            options={types}
            scannerConfig={scannerConfig}
            setScannerConfig={setScannerConfig}
          />
        </Grid>
        <Grid item xs={5}>
          <ScannerSelect
            optionType="mode"
            options={modes}
            scannerConfig={scannerConfig}
            setScannerConfig={setScannerConfig}
          />
        </Grid>
      </Grid>
      <IconButton
        size="large"
        disabled={isScanning}
        aria-label="qr-reader-button"
        onClick={() => {
          setIsScanning((oldVal) => !oldVal);
        }}
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: '350px',
          maxHeight: '350px',
        }}
      >
        <QrCodeScannerIcon sx={{ width: '100%', height: '100%' }} />
      </IconButton>
      <Typography>{t('title.tapToScan')}</Typography>
    </>
  );
};

export default ScannerButtons;
