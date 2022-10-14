import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const Box = dynamic(() => import('@mui/material/Box'));
const MobileContainer = dynamic(
  () => import('components/common/mobile/MobileContainer')
);
const Login = dynamic(() => import('components/auth/Login'));

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

export const LoginPage: NextPage = () => {
  return (
    <>
      <Seo title="Login" />
      <Box sx={{ backgroundColor: (t) => t.palette.common.lightGrey }}>
        <MobileContainer
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: (t) => t.spacing(2),
          }}
        >
          <Login />
        </MobileContainer>
      </Box>
    </>
  );
};

export default LoginPage;
