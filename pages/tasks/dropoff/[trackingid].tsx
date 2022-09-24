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

export interface DropoffTaskPageProps {
  orderId: string;
}

export const DropoffTaskPage: NextPageWithLayout<DropoffTaskPageProps> = ({
  orderId,
}) => {
  const bottomPadding = '1rem';

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
