import type { SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';
import useAuth from 'hooks/auth/useAuth';
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
  const { setAuth } = useAuth();
  const [, setUserData] = useUser();
  const router = useRouter();
  const { t } = useTranslation('common');
  const [remember, setRemember] = useState(false);
  const { handleSubmit, setError } = useFormContext();
  const { mutateAsync: driverLoginAsync } = useDriverLogin();

  const formComponentProps: LoginFormComponentProps = {
    formId,
    remember,
    hintSpace: false,
    showLabel: false,
    clearable: false,
  };

  const onSubmit = async (formData: any) => {
    try {
      const { status, data } = await driverLoginAsync(formData);

      if (status === 200) {
        setUserData(data);
        setAuth(data);

        router.push((router.query?.from as string) || '/dashboard');
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
