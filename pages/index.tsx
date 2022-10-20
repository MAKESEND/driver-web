import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userDataState } from 'states';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'scanner']))),
    },
  };
};

const Home: NextPage = () => {
  const router = useRouter();
  const userData = useRecoilValue(userDataState);

  useEffect(() => {
    if (userData) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [userData, router]);

  return (
    <>
      <Seo title="MAKESEND" />
    </>
  );
};

export default Home;
