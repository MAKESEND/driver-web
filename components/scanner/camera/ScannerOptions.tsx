import { useRecoilValue, useRecoilState } from 'recoil';
import { camerasState, selectedCameraState } from 'states';
import ImageIcon from '@mui/icons-material/Image';
import { ButtonGroup, MenuItem, IconButton, Select } from '@mui/material';

export interface ScannerOptions {
  isLoading?: boolean;
}

export const ScannerOptions: React.FC<ScannerOptions> = ({
  isLoading = false,
}) => {
  const cameras = useRecoilValue(camerasState);
  const [selectedCamera, setSelectedCamera] =
    useRecoilState(selectedCameraState);

  return (
    <ButtonGroup
      size="small"
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: (theme) => theme.palette.common.white,
        opacity: '0.5',
      }}
      disabled={isLoading}
    >
      <IconButton>
        <ImageIcon />
      </IconButton>
      <Select
        size="small"
        fullWidth
        disabled={isLoading}
        value={selectedCamera}
        onChange={(e) => {
          setSelectedCamera(e.target.value);
        }}
      >
        {cameras.map(({ id, label }) => {
          return (
            <MenuItem key={id} value={id}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </ButtonGroup>
  );
};

export default ScannerOptions;
