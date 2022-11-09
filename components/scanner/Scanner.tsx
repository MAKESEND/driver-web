import type { ScannerConfig, ScannedResult } from 'types';
import type { SelectChangeEvent } from '@mui/material';
import type { QrReaderProps } from 'react-qr-reader';
import { ScannerTask, ScannerMode } from 'types/scanner.d';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { selectedCameraState } from 'states';
import { useToast } from 'hooks/useToast';
import { useModal } from 'hooks/useModal';
import { useVideoDevices } from 'hooks/useVideoDevices';
import { ScannerContext } from 'context/ScannerContext';
import ScannerSelect from 'components/scanner/ScannerSelect';
import { Box, Button, Stack, IconButton, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import dynamic from 'next/dynamic';
const QrReader = dynamic(() =>
  import('react-qr-reader').then((mod) => mod.QrReader)
);
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

const tasks = Object.keys(ScannerTask) as ScannerTask[];
const modes = Object.keys(ScannerMode) as ScannerMode[];

export interface ScannerProps {
  mode?: keyof typeof ScannerMode;
  task?: keyof typeof ScannerTask;
}

export const Scanner: React.FC<ScannerProps> = ({
  mode = 'single',
  task = 'scan',
}) => {
  const [showToast] = useToast();
  const [showModal] = useModal();
  const devices = useVideoDevices();
  const { t } = useTranslation(['scanner']);

  const initRef = useRef(false);
  const scannedResultRef = useRef<ScannedResult[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [config, setConfig] = useState<ScannerConfig>({ mode, task });
  const [selectedCamera, setSelectedCamera] =
    useRecoilState(selectedCameraState);

  useEffect(() => {
    if (selectedCamera && initRef.current) {
      setIsScanning(true);
    }

    if (!initRef.current) {
      initRef.current = true;
    }
  }, [selectedCamera]);

  const toggleScanning = () => {
    setIsScanning((isScanning) => !isScanning);
  };

  const onSelectChange = (event: SelectChangeEvent) => {
    setSelectedCamera(event.target.value);
    setIsScanning(false);
  };

  const onScannedResult: QrReaderProps['onResult'] = (result, error) => {
    if (result) {
      const scannedResult = { text: result.getText(), scanned_at: Date.now() };

      if (config.mode === 'single') {
        scannedResultRef.current = [scannedResult];
        setIsScanning(false);
      } else if (config.mode === 'bulk') {
        scannedResultRef.current = [...scannedResultRef.current, scannedResult];
      }
    }

    // error will be an empty object {}
    // when scanner got nothing during the deply interval (default 0.5s)
    if (!!error && JSON.stringify(error) !== JSON.stringify({})) {
      showModal({
        modalType: 'ALERT',
        props: {
          title: t('error.scannerError'),
          description: error?.message || t('error.somethingWentWrong'),
        },
      });
    }
  };

  return (
    <ScannerContext.Provider value={scannedResultRef}>
      <Stack sx={{ gap: 2, my: 1 }}>
        <Button
          variant="contained"
          color={isScanning ? 'error' : 'primary'}
          onClick={toggleScanning}
        >
          {isScanning ? t('btn.stop') : t('btn.start')}
        </Button>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item xs={6} sx={{ pr: 1 }}>
            <ScannerSelect
              optionType="task"
              options={tasks}
              scannerConfig={config}
              setScannerConfig={setConfig}
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: 1 }}>
            <ScannerSelect
              optionType="mode"
              options={modes}
              scannerConfig={config}
              setScannerConfig={setConfig}
            />
          </Grid>
        </Grid>
        {devices.length && (
          <FormControl fullWidth>
            <InputLabel>{t(`select.camera.label`)}</InputLabel>
            <Select
              size="small"
              label={t(`select.camera.label`)}
              value={selectedCamera}
              onChange={onSelectChange}
            >
              {devices.map(({ deviceId, label }) => (
                <MenuItem key={deviceId} value={deviceId}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>
      <Box
        sx={{
          mx: 'auto',
          width: '100%',
          height: '100%',
          maxWidth: '350px',
          maxHeight: '350px',
        }}
      >
        {isScanning ? (
          <QrReader
            onResult={onScannedResult}
            constraints={{
              aspectRatio: 1,
              ...(selectedCamera
                ? { deviceId: { exact: selectedCamera } }
                : { facingMode: 'environment' }),
            }}
          />
        ) : (
          <>
            <IconButton
              size="large"
              disabled={isScanning}
              aria-label="qr-reader-button"
              onClick={toggleScanning}
              sx={{ width: '100%', height: '100%' }}
            >
              <QrCodeScannerIcon sx={{ width: '100%', height: '100%' }} />
            </IconButton>
            <Typography>{t('title.tapToScan')}</Typography>
          </>
        )}
      </Box>
    </ScannerContext.Provider>
  );
};

export default Scanner;
