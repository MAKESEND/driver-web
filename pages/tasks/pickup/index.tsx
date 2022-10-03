import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetPickupTasks } from 'hooks/useQueryData';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout')
);
const FlexCenterBox = dynamic(() => import('components/layouts/FlexCenterBox'));
const MobileContainer = dynamic(
  () => import('components/common/mobile/MobileContainer')
);
const Loader = dynamic(() => import('components/common/loader/Loader'));
const PickupTasks = dynamic(
  () => import('components/tasks/pickup/PickupTasks')
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'tasks', 'sorting']))),
    },
  };
};

export const PickupPage: NextPageWithLayout = () => {
  // this should filter by driver id with authentication
  const { data: pickupTasks, isLoading } = useGetPickupTasks();

  return (
    <>
      <Seo title="Pickup" />
      {isLoading ? (
        <FlexCenterBox>
          <Loader />
        </FlexCenterBox>
      ) : (
        <MobileContainer>
          <PickupTasks pickupTasks={pickupTasks} />
        </MobileContainer>
      )}
    </>
  );
};

PickupPage.getLayout = (page: React.ReactNode) => {
  return (
    <DrawerLayout sxMain={{ paddingTop: 0 }} fillContainer>
      {page}
    </DrawerLayout>
  );
};

export default PickupPage;
