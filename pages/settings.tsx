import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout'),
  { ssr: false }
);
const MobileContainer = dynamic(
  () => import('components/common/mobile/MobileContainer')
);
const Settings = dynamic(() => import('components/settings/Settings'));

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
      <MobileContainer>
        <Settings />
      </MobileContainer>
    </>
  );
};

SettingsPage.getLayout = (page: React.ReactNode) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default SettingsPage;
