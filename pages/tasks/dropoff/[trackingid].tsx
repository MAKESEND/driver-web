import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import MobileLayout from 'components/layouts/mobileLayout/MobileLayout';
import { MobileContainer } from 'components/common/mobile/MobileContainer';

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
      ></MobileContainer>
    </>
  );
};

DropoffTaskPage.getLayout = (page: ReactNode) => {
  return (
    <MobileLayout fillContainer hideOnScroll>
      {page}
    </MobileLayout>
  );
};

export default DropoffTaskPage;
