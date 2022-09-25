import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetPickupTasks } from 'hooks/useQueryData';
import Seo from 'components/common/Seo';
import { Loader } from 'components/common/loader/Loader';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import { FlexCenterBox } from 'components/layouts/FlexCenterBox';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { PickupTasks } from 'components/tasks/pickup/PickupTasks';

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
