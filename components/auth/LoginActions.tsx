import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';

export interface LoginActionProps {
  formId?: string;
}

export const LoginAction: React.FC<LoginActionProps> = ({ formId }) => {
  const { t } = useTranslation('common');
  const [disabled, setDisabled] = useState(false);
  const {
    formState: { isSubmitting, errors },
  } = useFormContext();

  useEffect(() => {
    if (errors?.phone || errors?.dob || errors?.login_failed) {
      setDisabled(true);
    }

    return () => setDisabled(false);
  }, [errors?.phone, errors?.dob, errors?.login_failed]);

  return (
    <Button
      form={formId}
      type="submit"
      variant="contained"
      fullWidth
      disabled={isSubmitting || disabled}
      sx={{ maxWidth: (t) => t.layout.size.btnMaxWidth }}
    >
      {t('btn.login')}
    </Button>
  );
};

export default LoginAction;
