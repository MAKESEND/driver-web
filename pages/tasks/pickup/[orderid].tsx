import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetParcelsByOrderId } from 'hooks/useQueryData';
import Seo from 'components/common/Seo';
import { PickupLoader } from 'components/tasks/pickup/orderid/PickupLoader';
import MobileLayout from 'components/layouts/mobileLayout/MobileLayout';
import { MobileContainer } from 'components/common/mobile/MobileContainer';

import dynamic from 'next/dynamic';
const PickupOrderId = dynamic(
  () => import('components/tasks/pickup/PickupOrderId'),
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
  const bottomPadding = '1rem';
  const { data: parcels, isLoading } = useGetParcelsByOrderId(orderId);

  return (
    <>
      <Seo title={`${orderId.toUpperCase()}`} />
      <MobileContainer
        sx={{
          position: 'relative',
          margin: '0 auto',
          paddingX: (t) => t.spacing(2),
          paddingBottom: `calc(36.5px + ${bottomPadding} * 2)`,
        }}
      >
        {isLoading ? (
          <PickupLoader />
        ) : (
          <PickupOrderId orderId={orderId} parcels={parcels} float />
        )}
      </MobileContainer>
    </>
  );
};

PickupOrderPage.getLayout = (page: ReactNode) => {
  return (
    <MobileLayout fillContainer hideOnScroll>
      {page}
    </MobileLayout>
  );
};

export default PickupOrderPage;
