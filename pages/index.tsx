import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
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
      <HomeFC />
    </>
  );
};

export default Home;
