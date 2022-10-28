import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const Settings = dynamic(() => import('components/settings/Settings'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout'),
  { ssr: false }
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
      <Settings />
    </>
  );
};

SettingsPage.getLayout = (page: React.ReactNode) => {
  return <DrawerLayout mobileContainer>{page}</DrawerLayout>;
};

export default SettingsPage;
