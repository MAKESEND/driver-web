import type { ConfirmModalProps } from 'types';
import { forwardRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useModal } from 'hooks/useModal';
import ModalLayout from 'components/common/modal/ModalLayout';
import {
  Button,
  Stack,
  Typography as MuiTypography,
  styled,
} from '@mui/material';

const Typography = styled(MuiTypography)(() => ({ textAlign: 'center' }));

export const ConfirmModal: React.FC<ConfirmModalProps> = forwardRef(
  (
    { title, description, bodyEl, confirmText, cancelText, onConfirm, onClose },
    ref
  ) => {
    const { t } = useTranslation('common');
    const [, hide] = useModal();

    return (
      <ModalLayout ref={ref}>
        <Stack gap={1}>
          <Typography>{title}</Typography>
          {description && <Typography>{description}</Typography>}
          {bodyEl}
          <Stack sx={{ flex: 1, height: 40, flexDirection: 'row' }}>
            <Button
              variant="text"
              sx={{
                flex: 1,
                height: 40,
                border: (theme) => theme.palette.common.grey40,
                color: (theme) => theme.palette.common.grey80,
              }}
              onClick={onClose ?? hide}
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
