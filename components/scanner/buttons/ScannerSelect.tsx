import type { ScannerConfig } from 'types';
import { useTranslation } from 'next-i18next';
import { ScannerTask, ScannerMode } from 'types/scanner.d';
import { FormControl, InputLabel, MenuItem } from '@mui/material';

import dynamic from 'next/dynamic';
const Select = dynamic(() => import('@mui/material/Select'));

const tasks = Object.keys(ScannerTask) as ScannerTask[];
const modes = Object.keys(ScannerMode) as ScannerMode[];
const options = { task: tasks, mode: modes };

export interface ScannerSelectProps {
  optionType: keyof ScannerConfig;
  scannerConfig?: ScannerConfig | null;
  setScannerConfig?: React.Dispatch<React.SetStateAction<ScannerConfig>>;
}

export const ScannerSelect: React.FC<ScannerSelectProps> = ({
  optionType,
  scannerConfig = null,
  setScannerConfig = () => console.warn('no setScannerConfig to ScannerSelect'),
}) => {
  const { t } = useTranslation(['scanner']);

  if (!scannerConfig) return null;

  if (!options[optionType]) return null;

  return (
    <FormControl fullWidth>
      <InputLabel>{t(`select.${optionType}.label`)}</InputLabel>
      <Select
        label={t(`select.${optionType}.label`)}
        size="small"
        value={scannerConfig[optionType]}
        onChange={(e) =>
          setScannerConfig((val) => ({
            ...val,
            [optionType]: e.target.value,
          }))
        }
      >
        {options[optionType].map((option) => (
          <MenuItem key={option} value={option}>
            {t(`select.${optionType}.${option}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ScannerSelect;
