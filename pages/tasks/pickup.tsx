import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

export const PickupPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="Pickup" />
    </>
  );
};

PickupPage.getLayout = (page: ReactNode) => {
  return <DrawerLayout fillContainer>{page}</DrawerLayout>;
};

export default PickupPage;
