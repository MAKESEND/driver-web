import type { AlertModalProps } from 'types';
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

export const AlertModal: React.FC<AlertModalProps> = forwardRef(
  ({ title, description, cancelText, onClose }, ref) => {
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
                border: (theme) => theme.palette.common.grey40,
                color: (theme) => theme.palette.common.grey80,
              }}
              onClick={onClose ?? hide}
            >
              {cancelText || t('btn.cancel')}
            </Button>
          </Stack>
        </Stack>
      </ModalLayout>
    );
  }
);

AlertModal.displayName = 'AlertModal';

export default AlertModal;
