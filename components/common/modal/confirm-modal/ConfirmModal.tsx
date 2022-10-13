import type { ConfirmModalProps } from 'types';
import { forwardRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useModal } from 'hooks/useModal';
import ModalLayout from '../ModalLayout';
import {
  Button,
  Stack,
  Typography as MuiTypography,
  styled,
} from '@mui/material';

const Typography = styled(MuiTypography)(() => ({ textAlign: 'center' }));

export const ConfirmModal: React.FC<ConfirmModalProps> = forwardRef(
  ({ title, description, confirmText, cancelText, onConfirm }, ref) => {
    const { t } = useTranslation('common');
    const [, hide] = useModal();

    return (
      <ModalLayout ref={ref}>
        <Stack gap={1}>
          <Typography>{title}</Typography>
          <Typography>{description}</Typography>
          <Stack sx={{ flex: 1, height: 40 }}>
            <Button
              variant="text"
              sx={{
                flex: 1,
                height: 40,
                border: (t) => t.palette.common.grey40,
                color: (t) => t.palette.common.grey80,
              }}
              onClick={hide}
            >
              {cancelText || t('btn.cancel')}
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1, height: 40 }}
              onClick={onConfirm}
            >
              {confirmText || t('btn.confirm')}
            </Button>
          </Stack>
        </Stack>
      </ModalLayout>
    );
  }
);

ConfirmModal.displayName = 'ConfirmModal';

export default ConfirmModal;
