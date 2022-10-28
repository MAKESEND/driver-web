import type { SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import useUser from 'hooks/useUser';
import { useDriverLogin } from 'hooks/useMutateData';
import FlexCenterBox from 'components/layouts/FlexCenterBox';

import dynamic from 'next/dynamic';
const LoginFormPhone = dynamic(() => import('./login-form/LoginFormPhone'), {
  ssr: false,
});
const LoginFormDOB = dynamic(() => import('./login-form/LoginFormDOB'), {
  ssr: false,
});
const LoginFormOptions = dynamic(
  () => import('./login-form/LoginFormOptions'),
  { ssr: false }
);

export interface LoginFormComponentProps {
  formId?: string;
  remember?: boolean;
  hintSpace?: boolean;
  clearable?: boolean;
  showLabel?: boolean;
  lastItem?: boolean;
  sx?: SxProps<Theme>;
}

export interface LoginFormProps {
  id?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ id: formId }) => {
  const [, setUserData] = useUser();
  const { t } = useTranslation('common');
  const [remember, setRemember] = useState(false);
  const { handleSubmit, setError } = useFormContext();
  const { mutateAsync: driverLogin } = useDriverLogin();

  const formComponentProps: LoginFormComponentProps = {
    formId,
    remember,
    hintSpace: false,
    showLabel: false,
    clearable: false,
  };

  const onSubmit = async (formData: any) => {
    try {
      const { status, data } = await driverLogin(formData);

      if (status === 200) {
        setUserData(data);
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setError('login_failed', {
          type: 'login_failure',
          message: t('auth.error.loginFailed'),
        });
      }
    }
  };

  return (
    <form id={formId} name={formId} onSubmit={handleSubmit(onSubmit)}>
      <FlexCenterBox sx={{ flexDirection: 'column' }}>
        <LoginFormDOB {...formComponentProps} />
        <LoginFormPhone {...formComponentProps} lastItem />
        <LoginFormOptions setRemember={setRemember} />
      </FlexCenterBox>
    </form>
  );
};

export default LoginForm;
