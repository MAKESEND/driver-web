import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from 'pages/_app';
import { Suspense } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useGetPickupTasks } from 'hooks/useQueryData';
import { getPickupTasks } from 'utils/services/getPickupTasks';
import auth from 'utils/auth';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const Loader = dynamic(() => import('components/common/loader/Loader'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout')
);
const PickupTasks = dynamic(
  () => import('components/tasks/pickup/PickupTasks'),
  { suspense: true }
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  try {
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

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
      ['pickupTasks', userData?.id],
      async () => await getPickupTasks(userData?.id)
    );

    return {
      props: {
        userId: userData?.id,
        dehydratedState: dehydrate(queryClient),
        ...(locale &&
          (await serverSideTranslations(locale, [
            'common',
            'tasks',
            'sorting',
          ]))),
      },
    };
  } catch (error: any) {
    console.log('something went wrong in /tasks/pickup');
    console.log(error?.message ?? error);

    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};

export const PickupPage: NextPageWithLayout<{ userId?: string }> = ({
  userId,
}) => {
  const { data: pickupTasks } = useGetPickupTasks(userId);

  return (
    <>
      <Seo title="Pickup" />
      <Suspense fallback={<Loader hideText />}>
        <PickupTasks pickupTasks={pickupTasks} />
      </Suspense>
    </>
  );
};

PickupPage.getLayout = (page: React.ReactNode) => {
  return (
    <DrawerLayout
      mobileContainer
      fillContainer
      sxMobile={{ p: 2, height: 'auto' }}
    >
      {page}
    </DrawerLayout>
  );
};

export default PickupPage;
