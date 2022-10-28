import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from 'pages/_app';
import { Suspense } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useGetSortingList } from 'hooks/useQueryData';
import { getSortingList } from 'utils/services/getSortingList';
import auth from 'utils/auth';

import dynamic from 'next/dynamic';
const Seo = dynamic(() => import('components/common/Seo'));
const DrawerLayout = dynamic(
  () => import('components/layouts/drawerLayout/DrawerLayout'),
  { ssr: false }
);
const Loader = dynamic(() => import('components/common/loader/Loader'));
const SortingList = dynamic(() => import('components/sorting/SortingList'), {
  suspense: true,
});

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
      ['sortinglist'],
      async () => await getSortingList()
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        ...(locale &&
          (await serverSideTranslations(locale, [
            'common',
            'sorting',
            'parcel',
          ]))),
      },
    };
  } catch (error: any) {
    console.log('something went wrong in /sorting');
    console.log(error?.message ?? error);

    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export const SortingPage: NextPageWithLayout = () => {
  const { data: sortingList } = useGetSortingList();

  return (
    <>
      <Seo title="Sorting" />
      <Suspense fallback={<Loader />}>
        <SortingList sortingList={sortingList} />
      </Suspense>
    </>
  );
};

SortingPage.getLayout = (page: React.ReactNode) => {
  return (
    <DrawerLayout mobileContainer fillContainer sxMobile={{ p: 2 }}>
      {page}
    </DrawerLayout>
  );
};

export default SortingPage;
