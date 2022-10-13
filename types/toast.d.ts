import type { AlertProps } from '@mui/material';

export interface CustomAlertProps extends AlertProps {
  autoHide?: boolean;
}

type ToastShowAction = {
  type: 'show';
  title?: string;
  message?: string;
  props?: CustomAlertProps;
  icon?: React.ReactNode;
};

type ToastHideAction = {
  type: 'hide';
};

export type ToastAction = ToastShowAction | ToastHideAction;
