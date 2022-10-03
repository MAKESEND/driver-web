import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetParcelsByOrderId } from 'hooks/useQueryData';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const MobileLayout = dynamic(
  () => import('components/layouts/mobileLayout/MobileLayout')
);
const MobileContainer = dynamic(
  () => import('components/common/mobile/MobileContainer')
);
const TaskLoader = dynamic(() => import('components/tasks/TaskLoader'));
const PickupOrderId = dynamic(
  () => import('components/tasks/pickup/PickupOrderId')
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
          <TaskLoader />
        ) : (
          <PickupOrderId orderId={orderId} parcels={parcels} float sticky />
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
