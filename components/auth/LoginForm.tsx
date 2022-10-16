import type { SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { useDriverLogin } from 'hooks/useMutateData';
import FlexCenterBox from 'components/layouts/FlexCenterBox';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useSetRecoilState } from 'recoil';
import { userDataState } from 'states';
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
  const router = useRouter();
  const { t } = useTranslation('common');
  const { handleSubmit, setError } = useFormContext();
  const [remember, setRemember] = useState(false);
  const setUserData = useSetRecoilState(userDataState);
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
