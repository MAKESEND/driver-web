import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from 'pages/_app';
import { useState, useEffect, Suspense } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useGetDropoffTasks } from 'hooks/useQueryData';
import { statusToConfirm } from 'utils/constants/tasks';
import getDropoffTasks from 'utils/services/getDropoffTasks';
import auth from 'utils/auth';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout'),
  { ssr: false }
);
const Loader = dynamic(() => import('components/common/loader/Loader'));
const DropoffCollectlist = dynamic(
  () => import('components/tasks/dropoff/page/DropoffCollectlist')
);
const DropoffTasklist = dynamic(
  () => import('components/tasks/dropoff/page/DropoffTasklist')
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
      ['dropoffTasks', userData?.id],
      async () => await getDropoffTasks(userData?.id)
    );

    return {
      props: {
        userId: userData?.id,
        dehydratedState: dehydrate(queryClient),
        ...(locale &&
          (await serverSideTranslations(locale, ['common', 'tasks']))),
      },
    };
  } catch (error: any) {
    console.log('something went wrong in /tasks/dropoff');
    console.log(error?.message ?? error);

    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};

export const DropoffPage: NextPageWithLayout<{ userId?: string }> = ({
  userId,
}) => {
  const [toConfirm, setToConfirm] = useState<boolean>(false);
  const { data: dropoffTasks } = useGetDropoffTasks(userId as string);

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
      <Suspense fallback={<Loader />}>
        <Worklist dropoffTasks={dropoffTasks} />
      </Suspense>
    </>
  );
};

DropoffPage.getLayout = (page: React.ReactNode) => {
  return (
    <DrawerLayout fillContainer mobileContainer sxMobile={{ p: 2 }}>
      {page}
    </DrawerLayout>
  );
};

export default DropoffPage;
