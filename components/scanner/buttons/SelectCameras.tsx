import type { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { selectedCameraState } from 'states/scanner';
import { useVideoDevices } from 'hooks/useVideoDevices';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const SelectCameras: React.FC = () => {
  const devices = useVideoDevices();
  const { t } = useTranslation(['scanner']);
  const [selectedCamera, setSelectedCamera] =
    useRecoilState(selectedCameraState);

  const onSelectChange = (event: SelectChangeEvent) => {
    setSelectedCamera(event.target.value);
  };

  if (!devices.length) return null;

  return (
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
  );
};

export default SelectCameras;
