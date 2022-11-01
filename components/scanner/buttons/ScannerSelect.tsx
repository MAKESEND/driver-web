import type { ScannerConfig } from 'types';
import { useTranslation } from 'next-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export interface ScannerSelectProps {
  optionType: keyof ScannerConfig;
  options: ScannerConfig[keyof ScannerConfig][];
  scannerConfig?: ScannerConfig | null;
  setScannerConfig?: React.Dispatch<React.SetStateAction<ScannerConfig>>;
}

export const ScannerSelect: React.FC<ScannerSelectProps> = ({
  optionType,
  options,
  scannerConfig = null,
  setScannerConfig = () => console.warn('no setScannerConfig to ScannerSelect'),
}) => {
  const { t } = useTranslation(['scanner']);

  if (!scannerConfig) return null;

  return (
    <FormControl fullWidth>
      <InputLabel>{t('select.type.label')}</InputLabel>
      <Select
        label={t('select.type.label')}
        size="small"
        value={scannerConfig[optionType]}
        onChange={(e) =>
          setScannerConfig((val) => ({
            ...val,
            [optionType]: e.target.value,
          }))
        }
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {t(`select.${optionType}.${option}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ScannerSelect;
