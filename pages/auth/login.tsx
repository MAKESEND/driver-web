import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dynamic from 'next/dynamic';
const Box = dynamic(() => import('@mui/material/Box'));
const Seo = dynamic(() => import('components/common/Seo'));
const Login = dynamic(() => import('components/auth/Login'));

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

export const LoginPage: NextPage = () => {
  // TODO: redirect to dashboard if the user has logged in
  return (
    <>
      <Seo title="Login" description="MAKESEND Driver App" />
      <Box sx={{ bgcolor: (theme) => theme.palette.common.lightGrey }}>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            m: '0 auto',
            p: 2,
            maxWidth: (theme) => theme.layout.size.portMaxWidth,
          }}
        >
          <Login />
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
