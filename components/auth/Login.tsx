import LoginBanner from './LoginBanner';
import LoginForm from './LoginForm';
import LoginActions from './LoginActions';
import { Card, CardContent, CardActions } from '@mui/material';

export const Login: React.FC = () => {
  const formId = 'ms-login';

  return (
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
  );
};

export default Login;
