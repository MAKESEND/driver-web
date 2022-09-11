import type { GetStaticProps } from 'next';
import type { ReactNode } from 'react';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import Seo from 'components/common/Seo';
import Settings from 'components/settings/Settings';
import { MobileContainer } from 'components/common';

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

SettingsPage.getLayout = (page: ReactNode) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default SettingsPage;
