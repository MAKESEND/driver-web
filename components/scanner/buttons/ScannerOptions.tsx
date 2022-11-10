import type { ScannerConfig } from 'types';
import SelectCameras from 'components/scanner/buttons/SelectCameras';
import ScannerSelect from 'components/scanner/buttons/ScannerSelect';
import { Grid, Stack } from '@mui/material';

export interface ScannerOptionsProps {
  scannerConfig: ScannerConfig;
  setScannerConfig: React.Dispatch<React.SetStateAction<ScannerConfig>>;
}

export const ScannerOptions: React.FC<ScannerOptionsProps> = ({
  scannerConfig,
  setScannerConfig,
}) => {
  return (
    <>
      <Stack sx={{ gap: 2, my: 1 }}>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item xs={6} sx={{ pr: 1 }}>
            <ScannerSelect
              optionType="task"
              scannerConfig={scannerConfig}
              setScannerConfig={setScannerConfig}
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: 1 }}>
            <ScannerSelect
              optionType="mode"
              scannerConfig={scannerConfig}
              setScannerConfig={setScannerConfig}
            />
          </Grid>
        </Grid>
        <SelectCameras />
      </Stack>
    </>
  );
};

export default ScannerOptions;
