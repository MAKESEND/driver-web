import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDriverLogin } from 'hooks/useMutateData';
import FlexCenterBox from 'components/layouts/FlexCenterBox';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
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
}

export interface LoginFormProps {
  id?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ id: formId }) => {
  const router = useRouter();
  const { handleSubmit, setError } = useFormContext();
  const [remember, setRemember] = useState(false);
  const { mutateAsync: driverLogin } = useDriverLogin();

  const formComponentProps: LoginFormComponentProps = {
    formId,
    remember,
  };

  const onSubmit = async (formData: any) => {
    const { status, data } = await driverLogin(formData);

    if (status === 200 && data) {
      router.push('/dashboard');
    } else {
      const type = 'login_failure';
      const message = 'invalid phone or date of birth';
      ['phone', 'dob'].forEach((name) => {
        setError(name, { type, message });
      });
    }
  };

  return (
    <form id={formId} name={formId} onSubmit={handleSubmit(onSubmit)}>
      <FlexCenterBox sx={{ flexDirection: 'column', gap: 1 }}>
        <LoginFormDOB {...formComponentProps} />
        <LoginFormPhone {...formComponentProps} />
        <LoginFormOptions setRemember={setRemember} />
      </FlexCenterBox>
    </form>
  );
};

export default LoginForm;
