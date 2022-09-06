import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  openDialog,
  dialogBody,
  dialogTitle,
  dialogAction,
} from 'states/dialog';
import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export const Dialog: FC = () => {
  const { t } = useTranslation('common');
  const Title = useRecoilValue(dialogTitle);
  const Body = useRecoilValue(dialogBody);
  const Action = useRecoilValue(dialogAction);
  const [open, setOpen] = useRecoilState(openDialog);

  return (
    <MuiDialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{Title}</DialogTitle>
      <DialogContent>{Body}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{t('btn.close')}</Button>
        {Action}
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
