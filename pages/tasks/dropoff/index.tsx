import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetDropoffTasks } from 'hooks';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { FlexCenterBox } from 'components/layouts/FlexCenterBox';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import { Loader } from 'components/common/loader/Loader';
import { DropoffTasks } from 'components/tasks/dropoff/DropoffTasks';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'tasks']))),
    },
  };
};

export const DropoffPage: NextPageWithLayout = () => {
  const { data: dropoffTasks, isLoading } = useGetDropoffTasks(
    '60e18027d1e7a00013affbb6' // testing id, should be removed
  );

  return (
    <>
      <Seo title="Dropoff" />
      {isLoading ? (
        <FlexCenterBox>
          <Loader />
        </FlexCenterBox>
      ) : (
        <MobileContainer>
          <DropoffTasks dropoffTasks={dropoffTasks} />
        </MobileContainer>
      )}
    </>
  );
};

DropoffPage.getLayout = (page: ReactNode) => {
  return (
    <DrawerLayout sxMain={{ paddingTop: 0 }} fillContainer>
      {page}
    </DrawerLayout>
  );
};

export default DropoffPage;
