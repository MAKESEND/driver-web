import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { Suspense } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const Loader = dynamic(() => import('components/common/loader/Loader'));
const Settings = dynamic(() => import('components/settings/Settings'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout')
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'settings']))),
    },
  };
};

export const SettingsPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="Settings" />
      <Suspense fallback={<Loader />}>
        <Settings />
      </Suspense>
    </>
  );
};

SettingsPage.getLayout = (page: React.ReactNode) => {
  return <DrawerLayout mobileContainer>{page}</DrawerLayout>;
};

export default SettingsPage;
