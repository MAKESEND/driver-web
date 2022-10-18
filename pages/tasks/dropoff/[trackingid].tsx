import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useGetParcelsByTrackingId } from 'hooks/useQueryData';
import auth from 'utils/auth';
import idValidator from 'utils/idValidator';
import getParcelsByTrackingId from 'utils/services/getParcelsByTrackingId';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const MobileLayout = dynamic(
  () => import('components/layouts/mobileLayout/MobileLayout')
);
const MobileContainer = dynamic(
  () => import('components/common/mobile/MobileContainer')
);
const TaskLoader = dynamic(() => import('components/tasks/TaskLoader'));
const DropoffTrackingId = dynamic(
  () => import('components/tasks/dropoff/DropoffTrackingId')
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

  const trackingId = query?.trackingid as string;
  const isValidId = idValidator.trackingId(trackingId);
  const queryClient = new QueryClient();

  if (isValidId) {
    await queryClient.prefetchQuery(
      ['parcel', trackingId],
      async () => await getParcelsByTrackingId(trackingId)
    );
  }

  return {
    props: {
      trackingId,
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

export interface DropoffTaskPageProps {
  trackingId: string;
}

export const DropoffTaskPage: NextPageWithLayout<DropoffTaskPageProps> = ({
  trackingId,
}) => {
  const bottomPadding = '1rem';
  const { data: parcel, isLoading } = useGetParcelsByTrackingId(trackingId);

  return (
    <>
      <Seo title={`${trackingId.toUpperCase()}`} />
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
          <DropoffTrackingId parcel={parcel} sticky float />
        )}
      </MobileContainer>
    </>
  );
};

DropoffTaskPage.getLayout = (page: React.ReactNode) => {
  return (
    <MobileLayout fillContainer hideOnScroll>
      {page}
    </MobileLayout>
  );
};

export default DropoffTaskPage;
