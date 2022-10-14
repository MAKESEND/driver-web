import type { Control, FieldValues } from 'react-hook-form';
import type { DriverAuthRequest } from 'types';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FlexCenterBox from 'components/layouts/FlexCenterBox';
import LoginFormDOB from './login-form/LoginFormDOB';

import dynamic from 'next/dynamic';
const LoginFormPhone = dynamic(() => import('./login-form/LoginFormPhone'), {
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
  const [remember, setRemember] = useState(false);
  const methods = useForm<DriverAuthRequest>();
  const { handleSubmit } = methods;

  const formComponentProps: LoginFormComponentProps = {
    formId,
    remember,
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        id={formId}
        name={formId}
        method="post"
        action="/api/auth/login"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FlexCenterBox sx={{ flexDirection: 'column' }}>
          <LoginFormDOB {...formComponentProps} />
          <LoginFormPhone {...formComponentProps} />
          <LoginFormOptions setRemember={setRemember} />
        </FlexCenterBox>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
