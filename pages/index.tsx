import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  useEffect(() => {
    router.push('/dashboard');
  });

  return (
    <>
      <Seo title="MAKESEND" />
    </>
  );
};

export default Home;
