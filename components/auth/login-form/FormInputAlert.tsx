import type { SxProps, Theme, SvgIconProps } from '@mui/material';
import { Fade, Typography } from '@mui/material';

import dynamic from 'next/dynamic';
const ReportGmailerrorredIcon = dynamic(
  () => import('@mui/icons-material/ReportGmailerrorredOutlined')
);

export interface FormInputAlertProps {
  show?: boolean;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  iconProps?: SvgIconProps;
}

export const FormInputAlert: React.FC<FormInputAlertProps> = ({
  show = false,
  children,
  sx,
  iconProps,
}) => {
  return (
    <Fade in={show}>
      <Typography
        sx={{
          px: 1,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          maxWidth: (t) => t.layout.size.btnMaxWidth,
          ...sx,
        }}
      >
        <ReportGmailerrorredIcon color="error" {...iconProps} />
        <Typography
          component="span"
          color="error"
          sx={{
            flexGrow: 1,
            textAlign: 'start',
            fontSize: '0.75rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {children}
        </Typography>
      </Typography>
    </Fade>
  );
};

export default FormInputAlert;
