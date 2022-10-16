import type { DriverAuthRequest } from 'types';
import { useForm, FormProvider } from 'react-hook-form';
import LoginForm from './LoginForm';
import LoginActions from './LoginActions';
import { Card, CardContent, CardActions } from '@mui/material';

import dynamic from 'next/dynamic';
const LoginBanner = dynamic(() => import('./LoginBanner'), { ssr: false });

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
            padding: (t) => t.spacing(2),
          }}
        >
          <LoginActions formId={formId} />
        </CardActions>
      </Card>
    </FormProvider>
  );
};

export default Login;
