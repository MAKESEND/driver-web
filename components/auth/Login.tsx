import type { DriverAuthRequest } from 'types';
import { useForm, FormProvider } from 'react-hook-form';
import LoginForm from 'components/auth/LoginForm';
import LoginActions from 'components/auth/LoginActions';
import { Card, CardContent, CardActions } from '@mui/material';

import dynamic from 'next/dynamic';
const LoginBanner = dynamic(() => import('components/auth/LoginBanner'));

export const Login: React.FC = () => {
  const formId = 'ms-login';
  const methods = useForm<DriverAuthRequest>();

  return (
    <FormProvider {...methods}>
      <Card>
        <CardContent>
          <LoginBanner />
          <LoginForm id={formId} />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1,
            padding: (theme) => theme.spacing(2),
          }}
        >
          <LoginActions formId={formId} />
        </CardActions>
      </Card>
    </FormProvider>
  );
};

export default Login;
