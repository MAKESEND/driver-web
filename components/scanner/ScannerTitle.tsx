import { FC } from 'react';
import { Typography as MuiTypography, styled } from '@mui/material';

const Typography = styled(MuiTypography)(({ theme }) => ({
  position: 'absolute',
  top: 100,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  zIndex: theme.zIndex.drawer + 2,
  color: theme.palette.white.main,
}));

export interface ScannerTitleProps {
  title?: string;
}

export const ScannerTitle: FC<ScannerTitleProps> = ({
  title = 'Scan QR Code',
}) => {
  return <Typography variant='h2'>{title}</Typography>;
};

export default ScannerTitle;
