import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';

export interface LoginActionProps {
  formId?: string;
}

export const LoginAction: React.FC<LoginActionProps> = ({ formId }) => {
  const { t } = useTranslation('common');
  const { formState } = useFormContext();

  console.log(formState.errors);

  return (
    <Button
      form={formId}
      type="submit"
      variant="contained"
      fullWidth
      disabled={formState.isSubmitting}
      sx={{ maxWidth: (t) => t.layout.size.btnMaxWidth }}
    >
      {t('btn.login')}
    </Button>
  );
};

export default LoginAction;
