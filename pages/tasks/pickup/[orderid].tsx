import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import MobileLayout from 'components/layouts/mobileLayout/MobileLayout';

import dynamic from 'next/dynamic';
const PickupOrderId = dynamic(
  () => import('components/tasks/pickup/orderid/PickupOrderId'),
  { ssr: false }
);

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const { orderid } = query;
  const invalidId = !/ms\d{13}/i.test(orderid as string);

  return {
    props: {
      orderId: orderid,
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'parcel', 'tasks']))),
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
      <PickupOrderId orderId={orderId} />
    </>
  );
};

PickupOrderPage.getLayout = (page: ReactNode) => {
  return <MobileLayout fillContainer>{page}</MobileLayout>;
};

export default PickupOrderPage;
