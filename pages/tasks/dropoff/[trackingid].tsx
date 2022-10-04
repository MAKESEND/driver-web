import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetParcelsByTrackingId } from 'hooks/useQueryData';

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
  locale,
  query,
}) => {
  const { trackingid } = query;
  const invalidId = !/ex\d{13}/i.test(trackingid as string);

  return {
    props: {
      trackingId: trackingid,
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
