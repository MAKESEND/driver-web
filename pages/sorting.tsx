import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';
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
const FlexCenterBox = dynamic(() => import('components/layouts/FlexCenterBox'));
const SortingList = dynamic(() => import('components/sorting/SortingList'));
const Loader = dynamic(() => import('components/common/loader/Loader'));

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
  const { data: sortingList, isLoading } = useGetSortingList();

  return (
    <>
      <Seo title="Sorting" />
      {isLoading ? (
        <FlexCenterBox>
          <Loader />
        </FlexCenterBox>
      ) : (
        <SortingList sortingList={sortingList} />
      )}
    </>
  );
};

SortingPage.getLayout = (page: React.ReactNode) => {
  return <DrawerLayout fillContainer>{page}</DrawerLayout>;
};

export default SortingPage;
