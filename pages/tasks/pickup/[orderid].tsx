import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useGetParcelsByOrderId } from 'hooks/useQueryData';
import auth from 'utils/auth';
import idValidators from 'utils/idValidator';
import getParcelsByOrderId from 'utils/services/getParcelsByOrderId';

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
  req,
  locale,
  query,
}) => {
  const userData = auth.getUser(req);

  // abort if token is invalid/missing
  // redirect to login
  if (!userData) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const orderId = query?.orderid as string;
  const isValidId = idValidators.orderId(orderId);
  const queryClient = new QueryClient();

  if (isValidId) {
    await queryClient.prefetchQuery(
      ['parcelsByOrderId', orderId],
      async () => await getParcelsByOrderId(orderId)
    );
  }

  return {
    props: {
      orderId,
      dehydratedState: dehydrate(queryClient),
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'parcel', 'tasks']))),
    },
    ...(!isValidId && {
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

PickupOrderPage.getLayout = (page: React.ReactNode) => {
  return (
    <MobileLayout fillContainer hideOnScroll>
      {page}
    </MobileLayout>
  );
};

export default PickupOrderPage;
