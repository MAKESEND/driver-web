import { useTranslation } from 'next-i18next';
import { Button } from '@mui/material';

export interface LoginActionProps {
  formId?: string;
}

export const LoginAction: React.FC<LoginActionProps> = ({ formId }) => {
  const { t } = useTranslation('common');

  return (
    <Button
      form={formId}
      type="submit"
      variant="contained"
      fullWidth
      sx={{ maxWidth: (t) => t.layout.size.btnMaxWidth }}
    >
      {t('btn.login')}
    </Button>
  );
};

export default LoginAction;
