import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const { orderid } = query;
  const invalidId = !/ms\d{13}/i.test(orderid as string);

  return {
    props: {
      orderId: orderid,
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
    ...(invalidId && {
      redirect: {
        destination: '/error',
      },
    }),
  };
};

export interface PickupOrderPageProps {
  orderId: string;
}

export const PickupOrderPage: NextPageWithLayout<PickupOrderPageProps> = ({
  orderId,
}) => {
  return (
    <>
      <Seo title={`Pickup ${orderId.toUpperCase()}`} />
    </>
  );
};

PickupOrderPage.getLayout = (page: ReactNode) => {
  return <DrawerLayout fillContainer>{page}</DrawerLayout>;
};

export default PickupOrderPage;
