import type { NextPage, GetStaticProps } from 'next';
import { Suspense } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const Loader = dynamic(() => import('components/common/loader/Loader'));
const HomeFC = dynamic(() => import('components/Home'));

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'scanner']))),
    },
  };
};

const Home: NextPage = () => {
  return (
    <>
      <Seo title="MAKESEND" />
      <Suspense fallback={<Loader hideText />}>
        <HomeFC />
      </Suspense>
    </>
  );
};

export default Home;
