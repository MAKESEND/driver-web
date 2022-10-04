import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../../_app';
import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useGetDropoffTasks } from 'hooks/useQueryData';
import { statusToConfirm } from 'utils/constants/tasks';
import getDropoffTasks from 'utils/services/getDropoffTasks';

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
const DropoffCollectlist = dynamic(
  () => import('components/tasks/dropoff/page/DropoffCollectlist')
);
const DropoffTasklist = dynamic(
  () => import('components/tasks/dropoff/page/DropoffTasklist')
);

const driverId = '60e18027d1e7a00013affbb6';
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['dropoffTasks', driverId],
    async () => await getDropoffTasks(driverId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'tasks']))),
    },
  };
};

export const DropoffPage: NextPageWithLayout = () => {
  const { data: dropoffTasks, isLoading } = useGetDropoffTasks(
    driverId // testing id, should be removed
  );

  const [toConfirm, setToConfirm] = useState<boolean>(false);

  useEffect(() => {
    return () => setToConfirm(false);
  }, []);

  useEffect(() => {
    if (Array.isArray(dropoffTasks)) {
      const isConfirming = dropoffTasks.some((task) =>
        statusToConfirm.includes(task.status)
      );

      setToConfirm(isConfirming);
    }
  }, [dropoffTasks]);

  const Worklist = toConfirm ? DropoffTasklist : DropoffCollectlist;

  return (
    <>
      <Seo title="Dropoff" />
      {isLoading ? (
        <FlexCenterBox>
          <Loader />
        </FlexCenterBox>
      ) : (
        <>
          <MobileContainer>
            <Worklist dropoffTasks={dropoffTasks} />
          </MobileContainer>
        </>
      )}
    </>
  );
};

DropoffPage.getLayout = (page: React.ReactNode) => {
  return (
    <DrawerLayout sxMain={{ padding: 0 }} fillContainer>
      {page}
    </DrawerLayout>
  );
};

export default DropoffPage;
